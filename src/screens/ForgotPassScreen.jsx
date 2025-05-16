import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import { Close, DangerousSharp } from '@mui/icons-material';
import FormSubmit from '../forms/FormSubmit';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassScreen() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    setResetError(null);

    try {
      // Use Firebase's sendPasswordResetEmail, but with our custom URL
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/account/reset-password',
        // url: 'http://192.168.194.130:5173/account/reset-password',
        handleCodeInApp: true,
      });
      setResetSent(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setResetError("No account exists with this email address.");
      } else if (error.code === 'auth/invalid-email') {
        setResetError("Invalid email address format.");
      } else {
        setResetError("An error occurred. Please try again later.");
      }
      console.error("Password reset error:", error);
    }
  };

  return (
    <div>
      <div className="grid place-items-center w-full h-full text-sm mt-8 mb-8">
        <h1 className="text-[32px] font-bold text-black text-center">Reset your password</h1>
      </div>

      <div className="grid place-items-center w-full h-full text-sm mt-8 mb-36 px-4">
        {!resetSent ? (
          <div className="max-w-[500px] w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-12'>
              <p className="mb-6 text-gray-600">Enter the email address associated with your Starbucks account, and we'll send you a link to reset your password.</p>

              <div className='relative flex flex-col mb-5'>
                <TextField
                  label="Email address"
                  name="email"
                  type="email"
                  slotProps={{
                    style: { color: "rgba(0,0,0,.30)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className='w-full'
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                />
                {errors.email && (
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <Close fontSize="small" className="text-[#e75b52]"/>
                    <span>{errors.email.message || "Enter a valid email address."}</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-full text-[#e75b52]"
                    />
                  </div>
                )}
              </div>

              {resetError && (
                <div className="mb-4 p-3 bg-red-50 text-red-800 rounded text-sm">
                  {resetError}
                </div>
              )}

              <FormSubmit name="Send Reset Link" type="submit">Send Reset Link</FormSubmit>

              <div className="mt-6 text-center">
                <Link to="/account/signin" className="text-[#00653e] font-semibold text-sm hover:underline">
                  Return to sign in
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col loginScreen-boxshad rounded-xl p-12 max-w-full h-full">
            <div className='min-w-[500px] min-h-[150px] flex flex-col lg:min-w-[400px] md:min-w-[300px]'>
              <div className="text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#00653e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-center mb-4">Check your email</h2>

              <p className="text-gray-600 text-center mb-6">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
              </p>

              <p className="text-gray-600 text-center mb-8 text-sm">
                If you don't see the email, check your spam folder. The link will expire in 24 hours.
              </p>

              <button
                onClick={() => navigate('/account/signin')}
                className="mx-auto px-6 py-2 bg-transparent border border-[#00653e] rounded-full text-[#00653e] font-semibold hover:bg-[rgba(0,86,62,0.06)]"
              >
                Return to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassScreen;
