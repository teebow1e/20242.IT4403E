import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import {
  Close,
  DangerousSharp,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { rateLimiter } from '../utils/RateLimiter';

const getClientIdentifier = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    const fingerprint =
      navigator.userAgent +
      window.screen.width +
      window.screen.height +
      new Date().getTimezoneOffset();
    return fingerprint;
  }
};

function SignupScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const submittingRef = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordPattern = {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/,
    message:
      'Password must be 8-25 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  };

  const clearSubmitError = () => {
    if (submitError) setSubmitError(null);
  };

  const onSubmit = async ({ fName, lName, email, password }) => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    const clientId = await getClientIdentifier();
    if (rateLimiter.isRateLimited(clientId)) {
      setSubmitError('Too many requests. Please try again later.');
      submittingRef.current = false;
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      await auth.signOut();

      await updateProfile(currentUser, {
        displayName: `${fName} ${lName}`,
      });

      await sendEmailVerification(currentUser, {
        url: window.location.origin + '/account/verify-email',
        handleCodeInApp: true,
      });

      alert(
        `A verification link has been sent to ${email}. Please check your email to verify your account before signing in.`
      );

      setVerificationSent(true);
    } catch (error) {
      console.error('Signup error:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setSubmitError(
            'This email is already in use. Please use a different email or sign in.'
          );
          break;
        case 'auth/invalid-email':
          setSubmitError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setSubmitError(
            'Password is too weak. Please follow the password requirements.'
          );
          break;
        case 'auth/network-request-failed':
          setSubmitError(
            'Network error. Please check your internet connection and try again.'
          );
          break;
        default:
          setSubmitError('An error occurred during signup. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (verificationSent) {
    return (
      <div className="max-w-[500px] mx-auto mt-8 p-6">
        <div className="text-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-[#00653e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Verify your email</h2>

        <p className="text-gray-600 text-center mb-6">
          We've sent a verification link to your email address. Please check your
          inbox and verify your email to complete signup.
        </p>

        <p className="text-gray-600 text-center mb-8 text-sm">
          If you don't see the email, check your spam folder. The link will
          expire in 24 hours.
        </p>

        <button
          onClick={() => navigate('/account/signin')}
          className="mx-auto block px-6 py-2 bg-transparent border border-[#00653e] rounded-full text-[#00653e] font-semibold hover:bg-[rgba(0,86,62,0.06)]"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid place-items-center text-[14px] mt-[30px]">
        <h1 className="text-[32px] font-bold text-black text-center">
          Create an account
        </h1>
      </div>

      <div className="flex-1 w-full grid place-items-center px-4">
        <div className="grid place-items-center text-center p-5 max-w-[50%] text-gray-600">
          <h4 className="text-[15px] font-bold mb-5">MEOWBUCK® REWARDS</h4>
          <p className="text-[14px] max-w-[80%] leading-[1.7]">
            Join Meowbucks Rewards to earn Stars for free food and drinks, any
            way you pay. Get access to mobile ordering, a birthday Reward, and{' '}
            <Link
              to="https://www.starbucks.com/rewards"
              className="text-gray-600 underline hover:no-underline"
            >
              more
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl max-w-[500px] w-full">
          <div className="p-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative w-full"
            >
              <fieldset disabled={isSubmitting}>
                <h4 className="text-gray-800 text-[19px] mb-2">
                  Personal Information
                </h4>

                <div className="relative flex flex-col mb-2.5">
                  <TextField
                    label="First name"
                    type="text"
                    className="w-full"
                    error={!!errors.fName}
                    {...register('fName', {
                      required: 'Enter your first name.',
                      onChange: clearSubmitError,
                    })}
                  />
                  {errors.fName && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                      <Close fontSize="small" className="text-red-500" />
                      <span>{errors.fName.message}</span>
                      <DangerousSharp
                        fontSize="small"
                        className="absolute right-[4%] top-0 translate-y-[90%] text-red-500"
                      />
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col mb-2.5">
                  <TextField
                    label="Last name"
                    type="text"
                    className="w-full"
                    error={!!errors.lName}
                    {...register('lName', {
                      required: 'Enter your last name.',
                      onChange: clearSubmitError,
                    })}
                  />
                  {errors.lName && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                      <Close fontSize="small" className="text-red-500" />
                      <span>{errors.lName.message}</span>
                      <DangerousSharp
                        fontSize="small"
                        className="absolute right-[4%] top-0 translate-y-[90%] text-red-500"
                      />
                    </div>
                  )}
                </div>

                <h4 className="text-gray-800 text-lg mb-2 mt-4">
                  Account Security
                </h4>

                <div className="relative flex flex-col mb-2.5">
                  <TextField
                    label="Email Address"
                    type="email"
                    className="w-full"
                    error={!!errors.email}
                    {...register('email', {
                      required: 'Enter an email address.',
                      pattern: {
                        value:
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Enter a valid email address.',
                      },
                      onChange: clearSubmitError,
                    })}
                  />
                  {errors.email && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                      <Close fontSize="small" className="text-red-500" />
                      <span>{errors.email.message}</span>
                      <DangerousSharp
                        fontSize="small"
                        className="absolute right-[4%] top-0 translate-y-[90%] text-red-500"
                      />
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col mb-2.5">
                  <div className="relative">
                    <TextField
                      label="Password"
                      type={passwordShown ? 'text' : 'password'}
                      className="w-full"
                      error={!!errors.password}
                      {...register('password', {
                        required: 'Enter a password.',
                        pattern: passwordPattern,
                        onChange: clearSubmitError,
                      })}
                    />
                    <div
                      onClick={() => setPasswordShown((prev) => !prev)}
                      className="cursor-pointer text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                    >
                      {passwordShown ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </div>
                  </div>

                  {errors.password && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                      <Close fontSize="small" className="text-red-500" />
                      <span>{errors.password.message}</span>
                    </div>
                  )}
                  <h5 className="text-gray-500 text-xs mt-2">
                    Create a password 8 to 25 characters long that includes at
                    least 1 uppercase and 1 lowercase letter, 1 number and 1
                    special character like an exclamation point or asterisk.
                  </h5>
                </div>

                {submitError && (
                  <div className="mt-4 mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                    {submitError}
                  </div>
                )}

                <h4 className="text-gray-600 text-sm my-6">
                  Collect more Stars & Earn Rewards
                </h4>
                <span className="text-gray-800 font-semibold block">
                  Email is a great way to know about offers and what's new from
                  Starbucks.
                </span>

                <div className="flex justify-end w-full mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative inline-block z-10 px-6 py-4.5 bg-[#00a862] shadow-lg border-0 rounded-full text-white text-lg font-bold leading-tight overflow-hidden text-center transition-all duration-200 ease-in-out ml-auto cursor-pointer hover:shadow-xl hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupScreen;
