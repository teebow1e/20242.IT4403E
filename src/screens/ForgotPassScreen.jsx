// src/screens/EmailActionScreen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  checkActionCode
} from 'firebase/auth';
import { TextField } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import FormSubmit from '../forms/FormSubmit';

// Import this component in your App.jsx and add the route:
// import EmailActionScreen from './screens/EmailActionScreen';
//
// Then add this route in your routes:
// <Route path="/auth/action" element={<EmailActionScreen />} />
//
// Set your Firebase action URL to: https://yourdomain.com/auth/action

function EmailActionScreen() {
  const [mode, setMode] = useState('');
  const [actionCode, setActionCode] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Password validation pattern
  const passwordPattern = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/,
    message: "Password must be 8-25 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modeParam = queryParams.get('mode');
    const oobCodeParam = queryParams.get('oobCode');

    if (!modeParam || !oobCodeParam) {
      setError('Invalid or missing action parameters');
      setLoading(false);
      return;
    }

    setMode(modeParam);
    setActionCode(oobCodeParam);

    handleEmailAction(modeParam, oobCodeParam);
  }, [location]);

  const handleEmailAction = async (actionMode, oobCode) => {
    try {
      switch (actionMode) {
        case 'resetPassword':
          await handlePasswordReset(oobCode);
          break;
        case 'verifyEmail':
          await handleEmailVerification(oobCode);
          break;
        case 'recoverEmail':
          await handleEmailRecovery(oobCode);
          break;
        default:
          setError('Unknown action mode');
      }
    } catch (error) {
      console.error('Email action error:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (oobCode) => {
    try {
      const email = await verifyPasswordResetCode(auth, oobCode);
      setEmail(email);
      // Don't complete the password reset here, wait for user input
    } catch (error) {
      throw new Error('This password reset link is invalid or has expired. Please request a new one.');
    }
  };

  const handleEmailVerification = async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setTimeout(() => {
        navigate('/account/signin', {
          state: { message: 'Email verified successfully! You can now sign in.' }
        });
      }, 3000);
    } catch (error) {
      throw new Error('This email verification link is invalid or has expired. Please request a new verification email.');
    }
  };

  const handleEmailRecovery = async (oobCode) => {
    try {
      const info = await checkActionCode(auth, oobCode);
      // Handle email recovery logic here
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setEmail(info.data.email);
    } catch (error) {
      throw new Error('This email recovery link is invalid or has expired.');
    }
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password
    if (!passwordPattern.value.test(newPassword)) {
      setError(passwordPattern.message);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate('/account/signin');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/expired-action-code':
        return 'This link has expired. Please request a new one.';
      case 'auth/invalid-action-code':
        return 'This link is invalid. Please check the link or request a new one.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      default:
        return error.message || 'An error occurred. Please try again.';
    }
  };

  const getPageTitle = () => {
    switch (mode) {
      case 'resetPassword':
        return 'Reset Your Password';
      case 'verifyEmail':
        return 'Verify Your Email';
      case 'recoverEmail':
        return 'Recover Your Email';
      default:
        return 'Email Action';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#006241] mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your request...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Action Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="w-full flex justify-center items-center mx-auto max-w-[300px]">
            <button
              onClick={() => navigate('/account/signin')}
              className="inline-block bg-transparent border border-solid rounded-full no-underline text-[#00653e] font-semibold text-sm py-1 px-4 leading-relaxed hover:bg-[rgba(0,86,62,0.06)]"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      );
    }

    if (success) {
      return (
        <div className="text-center">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            {mode === 'resetPassword' && 'Password Reset Successfully!'}
            {mode === 'verifyEmail' && 'Email Verified Successfully!'}
            {mode === 'recoverEmail' && 'Email Recovered Successfully!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {mode === 'resetPassword' && 'Your password has been updated. You will be redirected to the login page shortly.'}
            {mode === 'verifyEmail' && 'Your email has been verified. You can now sign in to your account.'}
            {mode === 'recoverEmail' && 'Your email has been recovered successfully.'}
          </p>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      );
    }

    // Show password reset form
    if (mode === 'resetPassword' && email) {
      return (
        <div>
          <div className="text-center mb-6">
            <p className="text-gray-600">Enter a new password for <strong>{email}</strong></p>
          </div>

          <form onSubmit={handlePasswordResetSubmit} className="space-y-5">
            <div className="relative flex flex-col">
              <div className="relative">
                <TextField
                  label="New Password"
                  type={passwordShown ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  slotProps={{
                    style: { color: "rgba(0,0,0,.30)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className="w-full"
                  required
                  error={!!error && error.includes('Password')}
                />
                <div
                  onClick={() => setPasswordShown(prev => !prev)}
                  className="cursor-pointer text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                >
                  {passwordShown ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col">
              <div className="relative">
                <TextField
                  label="Confirm Password"
                  type={confirmPasswordShown ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  slotProps={{
                    style: { color: "rgba(0,0,0,.30)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className="w-full"
                  required
                  error={!!error && error.includes('match')}
                />
                <div
                  onClick={() => setConfirmPasswordShown(prev => !prev)}
                  className="cursor-pointer text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                >
                  {confirmPasswordShown ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </div>
              </div>
              <h5 className="text-gray-500 text-xs mt-2">
                Password must be 8-25 characters long with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
              </h5>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-800 rounded text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end w-full mt-4">
              <FormSubmit
                name={loading ? "Resetting Password..." : "Reset Password"}
                type="submit"
                disabled={loading}
              />
            </div>
          </form>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="grid place-items-center w-full h-full text-sm mt-8 mb-8">
        <h1 className="text-[32px] font-bold text-black text-center">{getPageTitle()}</h1>
      </div>

      <div className="grid place-items-center w-full h-full text-sm mt-8 mb-36 px-4">
        <div className="max-w-[500px] w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default EmailActionScreen;
