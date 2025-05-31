import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { auth } from '../firebase';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import FormSubmit from '../forms/FormSubmit';

function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [email, setEmail] = useState('');
  const [oobCode, setOobCode] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Password strength requirements
  const passwordPattern = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/,
    message: "Password must be 8-25 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
  };

  useEffect(() => {
    // Extract the oobCode (action code) from the URL
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');

    if (!code) {
      setError('Invalid or expired password reset link');
      setVerifying(false);
      return;
    }

    setOobCode(code);

    // Verify the action code
    verifyPasswordResetCode(auth, code)
      .then((email) => {
        setEmail(email);
        setVerifying(false);
      })
      .catch((error) => {
        console.error('Error verifying reset code:', error);
        setError('This password reset link is invalid or has expired. Please request a new one.');
        setVerifying(false);
      });
  }, [location]);

  const validatePassword = (password) => {
    return passwordPattern.value.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    // Validate password
    if (!validatePassword(newPassword)) {
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
      // Reset the password
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate('/account/signin');
      }, 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid or has expired. Please request a new one.');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="max-w-[500px] mx-auto mt-8 p-6 text-center">
        <p>Verifying reset link...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-[500px] mx-auto mt-8 p-6 text-center">
        <div className="text-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#00653e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Password Reset Successfully!</h2>
        <p>Your password has been updated. You will be redirected to the login page shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid place-items-center w-full h-full text-sm mt-8 mb-8">
        <h1 className="text-[32px] font-bold text-black text-center">Reset your password</h1>
      </div>

      <div className="grid place-items-center w-full h-full text-sm mt-8 mb-36 px-4">
        <div className="max-w-[500px] w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl">
          <form onSubmit={handleSubmit} className='flex flex-col p-12'>
            {email && (
              <p className="mb-6 text-gray-600">
                Enter a new password for <strong>{email}</strong>
              </p>
            )}

            {/* New Password Field */}
            <div className='relative flex flex-col mb-5'>
              <div className="relative">
                <TextField
                  label="New Password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  slotProps={{ style: { color: "rgba(0,0,0,.30)" }, htmlInput: { style: { fontWeight: "400" } } }}
                  className='w-full'
                  error={!!error && error.includes('Password')}
                />
                <div onClick={() => setPasswordShown(prev => !prev)} className='cursor-pointer text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
                  {passwordShown ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </div>
              </div>
              <h5 className="text-gray-500 text-xs mt-2">
                Password must be 8-25 characters long with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
              </h5>
            </div>

            {/* Confirm Password Field */}
            <div className='relative flex flex-col mb-5'>
              <div className="relative">
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={confirmPasswordShown ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  slotProps={{ style: { color: "rgba(0,0,0,.30)" }, htmlInput: { style: { fontWeight: "400" } } }}
                  className='w-full'
                  error={!!error && error.includes('match')}
                />
                <div onClick={() => setConfirmPasswordShown(prev => !prev)} className='cursor-pointer text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
                  {confirmPasswordShown ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded text-sm">
                {error}
              </div>
            )}

            <FormSubmit
              name={loading ? "Resetting Password..." : "Reset Password"}
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordScreen;
