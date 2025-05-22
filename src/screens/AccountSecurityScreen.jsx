// src/screens/AccountSecurityScreen.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { selectUser } from '../features/UserSlice';
import { TOTPService } from '../services/TOTPService';
import TwoFactorSetup from '../components/TwoFactorSetup';
import Modal from '../components/Modal';

function AccountSecurityScreen() {
  const user = useSelector(selectUser);
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkTOTPStatus();
  }, [user]);

  const checkTOTPStatus = async () => {
    if (user) {
      setLoading(true);
      try {
        const enabled = await TOTPService.isTOTPEnabled(user.uid);
        setTotpEnabled(enabled);
      } catch (error) {
        console.error('Error checking TOTP status:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSetupComplete = (success) => {
    if (success) {
      setTotpEnabled(true);
      setMessage('Two-factor authentication has been successfully enabled!');
      setTimeout(() => setMessage(''), 5000);
    }
    setShowSetup(false);
  };

  const handleDisableTOTP = async () => {
    try {
      const result = await TOTPService.disableTOTP(user.uid);
      if (result.success) {
        setTotpEnabled(false);
        setMessage('Two-factor authentication has been disabled.');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      setMessage('Failed to disable two-factor authentication.');
    } finally {
      setShowDisableConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Account Security</h1>

      {message && (
        <Alert severity="success" className="mb-6">
          {message}
        </Alert>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
            <p className="text-gray-600 text-sm mt-1">
              Add an extra layer of security to your account using an authenticator app
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            totpEnabled
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {totpEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className={`w-5 h-5 rounded-full mt-0.5 ${
              totpEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {totpEnabled && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white m-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Authenticator App</h3>
              <p className="text-sm text-gray-600">
                {totpEnabled
                  ? 'Your account is protected with two-factor authentication using an authenticator app.'
                  : 'Use an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator to generate verification codes.'
                }
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            {!totpEnabled ? (
              <button
                onClick={() => setShowSetup(true)}
                className="px-6 py-2 bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
              >
                Enable Two-Factor Authentication
              </button>
            ) : (
              <button
                onClick={() => setShowDisableConfirm(true)}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
              >
                Disable Two-Factor Authentication
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Additional Security Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Security Information</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <span className="text-green-600 text-sm">Verified</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-600">Last updated recently</p>
            </div>
            <button className="text-[#006241] text-sm hover:underline">
              Change Password
            </button>
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium">Account Created</p>
              <p className="text-sm text-gray-600">
                {user?.metadata?.creationTime ?
                  new Date(user.metadata.creationTime).toLocaleDateString() :
                  'Unknown'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      <Modal isOpen={showSetup} onClose={() => setShowSetup(false)}>
        <TwoFactorSetup
          onClose={() => setShowSetup(false)}
          onSetupComplete={handleSetupComplete}
        />
      </Modal>

      {/* Disable Confirmation Modal */}
      <Modal isOpen={showDisableConfirm} onClose={() => setShowDisableConfirm(false)}>
        <div className="p-6 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Disable Two-Factor Authentication</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to disable two-factor authentication? This will make your account less secure.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowDisableConfirm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDisableTOTP}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Disable
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AccountSecurityScreen;
