// src/components/TwoFactorSetup.jsx - Updated for Backend Integration
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Alert, CircularProgress } from '@mui/material';
import { selectUser } from '../features/UserSlice';
import { TOTPService } from '../services/TOTPService';

function TwoFactorSetup({ onClose, onSetupComplete }) {
  const user = useSelector(selectUser);
  const [step, setStep] = useState(1); // 1: setup, 2: verify, 3: backup codes
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [manualEntryKey, setManualEntryKey] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [backendHealthy, setBackendHealthy] = useState(true);

  useEffect(() => {
    checkBackendHealth();
  }, []);

  useEffect(() => {
    if (backendHealthy) {
      setupTOTP();
    }
  }, [backendHealthy]);

  const checkBackendHealth = async () => {
    try {
      const healthy = await TOTPService.checkHealth();
      setBackendHealthy(healthy);
      if (!healthy) {
        setError('Backend service is unavailable. Please try again later.');
      }
    } catch (error) {
      setBackendHealthy(false);
      setError('Unable to connect to authentication service.');
    }
  };

  const setupTOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await TOTPService.setupTOTP(user.uid, user.email);

      if (result.success) {
        setQrCodeUrl(result.qrCodeUrl);
        setManualEntryKey(result.manualEntryKey);
      } else {
        setError(result.message || 'Failed to setup authenticator');
      }
    } catch (error) {
      console.error('Setup error:', error);
      setError('Failed to setup authenticator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setLoading(false);
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setError('Code must contain only numbers');
      setLoading(false);
      return;
    }

    try {
      const result = await TOTPService.verifyTOTPSetup(user.uid, verificationCode);

      if (result.success) {
        setBackupCodes(result.backupCodes || []);
        setShowBackupCodes(true);
        setSuccess(true);
        setStep(3);
      } else {
        setError(result.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Verification failed. Please check your code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetrySetup = () => {
    setStep(1);
    setError('');
    setQrCodeUrl('');
    setManualEntryKey('');
    setVerificationCode('');
    checkBackendHealth();
  };

  const copyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText).then(() => {
      alert('Backup codes copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = codesText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Backup codes copied to clipboard!');
    });
  };

  const downloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meowbucks-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Backend health check failed
  if (!backendHealthy) {
    return (
      <div className="p-8 text-center">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-red-700 mb-4">Service Unavailable</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex space-x-3">
          <button
            onClick={checkBackendHealth}
            className="flex-1 px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
          >
            Retry Connection
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Show backup codes
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

        <div className="flex space-x-3 mb-4">
          <button
            onClick={copyBackupCodes}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
          >
            Copy Codes
          </button>
          <button
            onClick={downloadBackupCodes}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
          >
            Download Codes
          </button>
        </div>

        <button
          onClick={() => {
            onSetupComplete?.(true);
            onClose?.();
          }}
          className="w-full px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Setup Two-Factor Authentication</h2>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
              <button
                onClick={handleRetrySetup}
                className="ml-2 text-sm underline hover:no-underline"
              >
                Retry
              </button>
            </Alert>
          )}

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
              {loading ? (
                <div className="text-center py-8">
                  <CircularProgress size={40} />
                  <p className="mt-2 text-sm text-gray-600">Generating QR code...</p>
                </div>
              ) : qrCodeUrl ? (
                <div className="text-center">
                  <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4 max-w-full" />
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-600">Failed to generate QR code</p>
                  <button
                    onClick={setupTOTP}
                    className="mt-2 text-sm text-[#006241] hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>

            {manualEntryKey && (
              <div>
                <h3 className="font-semibold mb-2">Alternative: Manual Entry</h3>
                <p className="text-sm text-gray-600 mb-2">
                  If you can't scan the QR code, enter this key manually:
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono break-all">
                  {manualEntryKey}
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="w-full px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
              disabled={!qrCodeUrl || loading}
            >
              {loading ? 'Setting up...' : 'Continue to Verification'}
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
                onChange={(e) => {
                  // Only allow numeric input
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setVerificationCode(value);
                    setError(''); // Clear error when user types
                  }
                }}
                fullWidth
                required
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]{6}',
                  autoComplete: 'one-time-code',
                  inputMode: 'numeric'
                }}
                error={!!error}
                helperText={error || `${verificationCode.length}/6 digits`}
                placeholder="000000"
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
                disabled={loading}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                className="flex-1 px-4 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <CircularProgress size={16} className="mr-2" />
                    Verifying...
                  </div>
                ) : (
                  'Verify & Enable'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="p-4 border-t">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TwoFactorSetup;
