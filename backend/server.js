const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const admin = require('firebase-admin');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization']
}));
app.set('trust proxy', true);

app.use(express.json({ limit: '10mb' }));

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const IV_LENGTH = 16;
const SALT_ROUNDS = 12;

const failedAttempts = new Map();
const usedTokens = new Map();

setInterval(() => {
  const now = Date.now();

  for (const [key, data] of failedAttempts.entries()) {
    if (now - data.timestamp > 900000) {
      failedAttempts.delete(key);
    }
  }

  for (const [key, timestamp] of usedTokens.entries()) {
    if (now - timestamp > 90000) {
      usedTokens.delete(key);
    }
  }
}, 300000);

function encrypt(text) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  try {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);

    const parts = text.split(':');
    if (parts.length !== 2) throw new Error('Invalid encrypted data format');

    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    throw new Error('Decryption failed');
  }
}

function constantTimeEquals(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

async function recordFailedAttempt(userId) {
  const now = Date.now();
  const existing = failedAttempts.get(userId);

  if (existing && (now - existing.timestamp) < 900000) {
    existing.count++;
    existing.timestamp = now;
  } else {
    failedAttempts.set(userId, { count: 1, timestamp: now });
  }
}

async function clearFailedAttempts(userId) {
  failedAttempts.delete(userId);
}

function isTokenReused(userId, token) {
  const key = `${userId}:${token}`;
  const timestamp = usedTokens.get(key);

  if (timestamp) {
    return true; // Token already used
  }

  // Mark token as used
  usedTokens.set(key, Date.now());
  return false;
}

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No valid authorization token provided' });
    }

    const idToken = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

function verifyTOTPSecure(secret, token) {
  const expectedToken = speakeasy.totp({
    secret,
    encoding: 'base32',
    window: 0
  });

  if (constantTimeEquals(token, expectedToken)) {
    return true;
  }

  for (let window = 1; window <= 2; window++) {
    const pastToken = speakeasy.totp({
      secret,
      encoding: 'base32',
      window: -window
    });

    const futureToken = speakeasy.totp({
      secret,
      encoding: 'base32',
      window: window
    });

    if (constantTimeEquals(token, pastToken) || constantTimeEquals(token, futureToken)) {
      return true;
    }
  }

  return false;
}


app.post('/api/totp/setup',
  authenticateUser,
  async (req, res) => {
    try {
      const userId = req.user.uid;
      const userEmail = req.user.email;

      const existingRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await existingRef.once('value');

      if (snapshot.exists() && snapshot.val().enabled) {
        return res.status(400).json({
          success: false,
          message: 'TOTP is already enabled for this account'
        });
      }

      const secret = speakeasy.generateSecret({
        name: `Meowbucks Coffee (${userEmail})`,
        issuer: 'Meowbucks Coffee',
        length: 32
      });

      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

      await existingRef.set({
        secret: encrypt(secret.base32),
        enabled: false,
        setupComplete: false,
        createdAt: new Date().toISOString()
      });

      res.json({
        success: true,
        qrCodeUrl,
        manualEntryKey: secret.base32
      });

    } catch (error) {
      console.error('TOTP setup error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to setup TOTP'
      });
    }
  }
);

app.post('/api/totp/verify-setup',
  authenticateUser,
  [
    body('token').isLength({ min: 6, max: 6 }).isNumeric().withMessage('Token must be a 6-digit number')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.user.uid;
      const { token } = req.body;

      const secretRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await secretRef.once('value');

      if (!snapshot.exists()) {
        return res.status(400).json({
          success: false,
          message: 'No TOTP setup found. Please start setup first.'
        });
      }

      const { secret: encryptedSecret, enabled } = snapshot.val();

      if (enabled) {
        return res.status(400).json({
          success: false,
          message: 'TOTP is already enabled'
        });
      }

      const secret = decrypt(encryptedSecret);
      const verified = verifyTOTPSecure(secret, token);

      if (verified) {
        await secretRef.update({
          enabled: true,
          setupComplete: true,
          enabledAt: new Date().toISOString()
        });

        const backupCodes = generateSecureBackupCodes();
        const hashedBackupCodes = await hashBackupCodes(backupCodes);

        await db.ref(`userSecrets/${userId}/backupCodes`).set(hashedBackupCodes);

        res.json({
          success: true,
          message: 'TOTP enabled successfully',
          backupCodes
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid verification code'
        });
      }

    } catch (error) {
      console.error('TOTP verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Verification failed'
      });
    }
  }
);

app.post('/api/totp/verify',
  authenticateUser,
  [
    body('token').isLength({ min: 6, max: 6 }).isNumeric().withMessage('Token must be a 6-digit number')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.user.uid;
      const { token } = req.body;

      if (isTokenReused(userId, token)) {
        return res.status(400).json({
          success: false,
          message: 'Security error. Please generate a new code.'
        });
      }

      // Get user's TOTP data
      const secretRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await secretRef.once('value');

      if (!snapshot.exists()) {
        return res.status(400).json({
          success: false,
          message: 'TOTP not setup'
        });
      }

      const { secret: encryptedSecret, enabled, setupComplete } = snapshot.val();

      if (!enabled || !setupComplete) {
        return res.status(400).json({
          success: false,
          message: 'TOTP not enabled'
        });
      }

      const secret = decrypt(encryptedSecret);
      const verified = verifyTOTPSecure(secret, token);

      if (verified) {
        await db.ref(`userSecrets/${userId}/lastVerification`).set({
          timestamp: new Date().toISOString(),
          ip: req.ip || req.connection.remoteAddress
        });

        await clearFailedAttempts(userId);

        res.json({
          success: true,
          message: 'Code verified successfully'
        });
      } else {
        await recordFailedAttempt(userId);
        res.status(400).json({
          success: false,
          message: 'Invalid verification code'
        });
      }

    } catch (error) {
      console.error('TOTP verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Verification failed'
      });
    }
  }
);

app.get('/api/totp/status',
  authenticateUser,
  async (req, res) => {
    try {
      const userId = req.user.uid;

      const secretRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await secretRef.once('value');

      if (!snapshot.exists()) {
        return res.json({
          success: true,
          enabled: false
        });
      }

      const { enabled, setupComplete } = snapshot.val();

      res.json({
        success: true,
        enabled: enabled && setupComplete
      });

    } catch (error) {
      console.error('TOTP status check error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to check TOTP status'
      });
    }
  }
);

app.delete('/api/totp/disable',
  authenticateUser,
  async (req, res) => {
    try {
      const userId = req.user.uid;

      const secretRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await secretRef.once('value');

      if (snapshot.exists()) {
        const currentData = snapshot.val();
        await secretRef.update({
          ...currentData,
          enabled: false,
          disabledAt: new Date().toISOString()
        });

        await db.ref(`userSecrets/${userId}/backupCodes`).remove();
      }

      res.json({
        success: true,
        message: 'TOTP disabled successfully'
      });

    } catch (error) {
      console.error('TOTP disable error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to disable TOTP'
      });
    }
  }
);

function generateSecureBackupCodes() {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(code);
  }
  return codes;
}

async function hashBackupCodes(codes) {
  return Promise.all(codes.map(async (code) => ({
    hash: await bcrypt.hash(code, SALT_ROUNDS),
    used: false,
    createdAt: new Date().toISOString()
  })));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the TOTP Backend API'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`TOTP Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
