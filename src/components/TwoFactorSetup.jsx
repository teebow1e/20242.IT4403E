// src/components/TwoFactorSetup.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Alert, CircularProgress } from '@mui/material';
import { selectUser } from '../features/UserSlice';
import { TOTPService } from '../services/TOTPService';
import FormSubmit from '../forms/FormSubmit';

function TwoFactorSetup({ onClose, onSetupComplete }) {
  const user = useSelector(selectUser);
  const [step, setStep] = useState(1); // 1: setup, 2: verify
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [manualEntryKey, setManualEntryKey] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  useEffect(() => {
    setupTOTP();
  }, []);

  const setupTOTP = async () => {
    setLoading(true);
    try {
      const result = await TOTPService.setupTOTP(user.uid, user.email);
      if (result.success) {
        setQrCodeUrl(result.qrCodeUrl);
        setManualEntryKey(result.manualEntryKey);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to setup authenticator');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await TOTPService.verifyTOTPSetup(user.uid, verificationCode);
      if (result.success) {
        // Generate backup codes
        const codes = TOTPService.generateBackupCodes();
        await TOTPService.storeBackupCodes(user.uid, codes);
        setBackupCodes(codes);
        setShowBackupCodes(true);
        setSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading && step === 1) {
    return (
      <div className="p-8 text-center">
        <CircularProgress />
        <p className="mt-4">Setting up authenticator...</p>
      </div>
    );
  }

  if (success && showBackupCodes) {
    return (
      <div className="p-8">
        <div className="mb-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Setup Complete!</h2>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Save Your Backup Codes</h3>
          <p className="text-sm text-yellow-700 mb-4">
            These backup codes can be used if you lose access to your authenticator app. Save them in a secure place.
          </p>

          <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white p-3 rounded border">
            {backupCodes.map((code, index) => (
              <div key={index} className="text-center py-1">
                {code}
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => {
              // Copy codes to clipboard
              navigator.clipboard.writeText(backupCodes.join('\n'));
              alert('Backup codes copied to clipboard!');
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
          >
            Copy Codes
          </button>
          <button
            onClick={() => {
              onSetupComplete?.(true);
              onClose?.();
            }}
            className="flex-1 px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-8 text-center">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Setup Complete!</h2>
        <p className="text-gray-600">Two-factor authentication has been enabled for your account.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Setup Two-Factor Authentication</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Step 1: Install an Authenticator App</h3>
              <p className="text-sm text-gray-600 mb-4">
                Download and install an authenticator app like:
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Google Authenticator</li>
                <li>Microsoft Authenticator</li>
                <li>Authy</li>
                <li>1Password</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 2: Scan QR Code</h3>
              {qrCodeUrl ? (
                <div className="text-center">
                  <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CircularProgress size={24} />
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Alternative: Manual Entry</h3>
              <p className="text-sm text-gray-600 mb-2">
                If you can't scan the QR code, enter this key manually:
              </p>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono break-all">
                {manualEntryKey}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
              disabled={!qrCodeUrl}
            >
              Continue to Verification
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Verify Setup</h2>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Enter the 6-digit code from your authenticator app to complete setup:
              </p>

              <TextField
                label="6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                fullWidth
                required
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]{6}',
                  autoComplete: 'one-time-code'
                }}
                error={!!error}
                helperText={error}
              />
            </div>

            {error && (
              <Alert severity="error">{error}</Alert>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                className="flex-1 px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Enable'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="p-4 border-t">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>


  );
}

export default TwoFactorSetup;
