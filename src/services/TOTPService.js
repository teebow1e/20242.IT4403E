// src/services/TOTPService.js
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase';
import jsSHA from 'jssha';
import QRCode from 'qrcode';

export class TOTPService {
  static async setupTOTP(userId, userEmail) {
    try {
      // Generate a secret manually using browser crypto
      const secret = this.generateSecret();

      // Create the service name and account name
      const serviceName = 'Meowbucks Coffee';
      const accountName = userEmail;

      // Generate the otpauth URL manually
      const otpauthUrl = `otpauth://totp/${encodeURIComponent(accountName)}?secret=${secret}&issuer=${encodeURIComponent(serviceName)}&algorithm=SHA1&digits=6&period=30`;

      // Store the secret in Firebase
      const userSecretRef = ref(db, `userSecrets/${userId}/totp`);
      await set(userSecretRef, {
        secret: secret,
        enabled: false,
        setupComplete: false,
        createdAt: new Date().toISOString()
      });

      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);

      return {
        success: true,
        secret: secret,
        qrCodeUrl,
        manualEntryKey: secret
      };
    } catch (error) {
      console.error('Error setting up TOTP:', error);
      return {
        success: false,
        message: 'Failed to setup authenticator'
      };
    }
  }

  // Generate secret manually using browser crypto
  static generateSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // Base32 alphabet
    let secret = '';

    // Generate 32 characters (160 bits when base32 decoded)
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    for (let i = 0; i < 32; i++) {
      secret += chars[array[i] % chars.length];
    }

    return secret;
  }

  static async verifyTOTPSetup(userId, token) {
    try {
      // Get user's secret
      const userSecretRef = ref(db, `userSecrets/${userId}/totp`);
      const snapshot = await get(userSecretRef);

      if (!snapshot.exists()) {
        return { success: false, message: 'No TOTP secret found' };
      }

      const { secret } = snapshot.val();

      // Verify the token using our implementation
      const verified = this.verifyToken(token, secret);

      if (verified) {
        // Mark TOTP as enabled and setup complete
        await set(userSecretRef, {
          secret,
          enabled: true,
          setupComplete: true,
          enabledAt: new Date().toISOString()
        });
      }

      return {
        success: verified,
        message: verified ? 'Authenticator setup successful' : 'Invalid code'
      };
    } catch (error) {
      console.error('Error verifying TOTP setup:', error);
      return {
        success: false,
        message: 'Verification failed'
      };
    }
  }

  static async verifyTOTP(userId, token) {
    try {
      // Get user's secret
      const userSecretRef = ref(db, `userSecrets/${userId}/totp`);
      const snapshot = await get(userSecretRef);

      if (!snapshot.exists()) {
        return { success: false, message: 'TOTP not setup' };
      }

      const { secret, enabled, setupComplete } = snapshot.val();

      if (!enabled || !setupComplete) {
        return { success: false, message: 'TOTP not enabled' };
      }

      // Verify the token using our implementation
      const verified = this.verifyToken(token, secret);

      return {
        success: verified,
        message: verified ? 'Code verified' : 'Invalid code'
      };
    } catch (error) {
      console.error('Error verifying TOTP:', error);
      return {
        success: false,
        message: 'Verification failed'
      };
    }
  }

  static verifyToken(token, secret) {
    const timeStep = 30; // 30 seconds
    const window = 2; // Allow ±2 time steps for clock drift
    const currentTime = Math.floor(Date.now() / 1000 / timeStep);

    for (let i = -window; i <= window; i++) {
      const timeCounter = currentTime + i;
      const expectedToken = this.generateTOTP(secret, timeCounter);

      if (expectedToken === token) {
        return true;
      }
    }

    return false;
  }

  static generateTOTP(secret, timeCounter) {
    // Decode base32 secret to bytes
    const secretBytes = this.base32Decode(secret);

    // Convert time counter to 8-byte big-endian array
    const timeBytes = new ArrayBuffer(8);
    const timeView = new DataView(timeBytes);
    timeView.setUint32(4, timeCounter, false); // Big-endian, put in last 4 bytes

    // Generate HMAC-SHA1
    const hmac = this.hmacSHA1(secretBytes, new Uint8Array(timeBytes));

    // Dynamic truncation
    const offset = hmac[hmac.length - 1] & 0x0f;
    const code = (
      ((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)
    ) % 1000000;

    return code.toString().padStart(6, '0');
  }

  static hmacSHA1(key, message) {
    const shaObj = new jsSHA('SHA-1', 'UINT8ARRAY');
    shaObj.setHMACKey(key, 'UINT8ARRAY');
    shaObj.update(message);
    return new Uint8Array(shaObj.getHMAC('UINT8ARRAY'));
  }

  static base32Decode(encoded) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';

    // Convert each character to 5-bit binary
    for (let i = 0; i < encoded.length; i++) {
      const char = encoded[i].toUpperCase();
      const index = chars.indexOf(char);
      if (index === -1) continue;
      bits += index.toString(2).padStart(5, '0');
    }

    // Convert bits to bytes
    const bytes = [];
    for (let i = 0; i < bits.length - 7; i += 8) {
      const byte = parseInt(bits.substr(i, 8), 2);
      bytes.push(byte);
    }

    return new Uint8Array(bytes);
  }

  static async isTOTPEnabled(userId) {
    try {
      const userSecretRef = ref(db, `userSecrets/${userId}/totp`);
      const snapshot = await get(userSecretRef);

      if (!snapshot.exists()) {
        return false;
      }

      const { enabled, setupComplete } = snapshot.val();
      return enabled && setupComplete;
    } catch (error) {
      console.error('Error checking TOTP status:', error);
      return false;
    }
  }

  static async disableTOTP(userId) {
    try {
      const userSecretRef = ref(db, `userSecrets/${userId}/totp`);
      const snapshot = await get(userSecretRef);

      if (snapshot.exists()) {
        const currentData = snapshot.val();
        await set(userSecretRef, {
          ...currentData,
          enabled: false,
          disabledAt: new Date().toISOString()
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Error disabling TOTP:', error);
      return { success: false, message: 'Failed to disable TOTP' };
    }
  }

  // Helper method to generate backup codes
  static generateBackupCodes() {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      // Generate 8-character backup codes
      const array = new Uint8Array(4);
      crypto.getRandomValues(array);
      const code = Array.from(array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
      codes.push(code);
    }
    return codes;
  }

  static async storeBackupCodes(userId, codes) {
    try {
      const backupCodesRef = ref(db, `userSecrets/${userId}/backupCodes`);
      const hashedCodes = codes.map(code => ({
        code: btoa(code), // Simple encoding, in production use proper hashing
        used: false,
        createdAt: new Date().toISOString()
      }));

      await set(backupCodesRef, hashedCodes);
      return { success: true };
    } catch (error) {
      console.error('Error storing backup codes:', error);
      return { success: false };
    }
  }
}
