const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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
  origin: process.env.FRONTEND_URL || 'http://192.168.194.130:5173',
  credentials: true
}));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const totpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 TOTP requests per windowMs
  message: 'Too many TOTP requests, please try again later.'
});

app.use(generalLimiter);
app.use(express.json({ limit: '10mb' }));

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

app.post('/api/totp/setup',
  totpLimiter,
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
        secret: secret.base32,
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
  totpLimiter,
  authenticateUser,
  [
    body('token').isLength({ min: 6, max: 6 }).isNumeric().withMessage('Token must be a 6-digit number')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.user.uid;
      const { token } = req.body;

      // Get user's secret
      const secretRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await secretRef.once('value');

      if (!snapshot.exists()) {
        return res.status(400).json({
          success: false,
          message: 'No TOTP setup found. Please start setup first.'
        });
      }

      const { secret, enabled } = snapshot.val();

      if (enabled) {
        return res.status(400).json({
          success: false,
          message: 'TOTP is already enabled'
        });
      }

      // Verify token
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 2 // Allow some time drift
      });

      if (verified) {
        // Enable TOTP
        await secretRef.update({
          enabled: true,
          setupComplete: true,
          enabledAt: new Date().toISOString()
        });

        // Generate backup codes
        const backupCodes = generateBackupCodes();
        const hashedBackupCodes = backupCodes.map(code => ({
          code: Buffer.from(code).toString('base64'), // Simple encoding
          used: false,
          createdAt: new Date().toISOString()
        }));

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
  totpLimiter,
  authenticateUser,
  [
    body('token').isLength({ min: 6, max: 6 }).isNumeric().withMessage('Token must be a 6-digit number')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.user.uid;
      const { token } = req.body;

      // Get user's TOTP data
      const secretRef = db.ref(`userSecrets/${userId}/totp`);
      const snapshot = await secretRef.once('value');

      if (!snapshot.exists()) {
        return res.status(400).json({
          success: false,
          message: 'TOTP not setup'
        });
      }

      const { secret, enabled, setupComplete } = snapshot.val();

      if (!enabled || !setupComplete) {
        return res.status(400).json({
          success: false,
          message: 'TOTP not enabled'
        });
      }

      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 2
      });

      if (verified) {
        await db.ref(`userSecrets/${userId}/lastVerification`).set({
          timestamp: new Date().toISOString(),
          ip: req.ip || req.connection.remoteAddress
        });

        res.json({
          success: true,
          message: 'Code verified successfully'
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
  totpLimiter,
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

function generateBackupCodes() {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    codes.push(code);
  }
  return codes;
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

app.use((req, res) => {
res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TOTP Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
