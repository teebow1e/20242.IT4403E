import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { login } from '../features/UserSlice';

function SignupScreen() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordPattern = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/,
    message: "Password must be 8-25 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
  };

  const clearSubmitError = () => {
    if (submitError) setSubmitError(null);
  };

  const onSubmit = async ({ fName, lName, email, password }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: `${fName} ${lName}` });
      dispatch(login({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: `${fName} ${lName}`
      }));
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setSubmitError('This email is already in use. Please use a different email or sign in.');
          break;
        case 'auth/invalid-email':
          setSubmitError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setSubmitError('Password is too weak. Please follow the password requirements.');
          break;
        case 'auth/network-request-failed':
          setSubmitError('Network error. Please check your internet connection and try again.');
          break;
        default:
          setSubmitError('An error occurred during signup. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header info */}
      <div className="w-full grid place-items-center text-[14px] mt-[30px]">
        <h1 className="text-[32px] font-bold text-black text-center">Create an account</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 w-full grid place-items-center px-4">
        <div className="grid place-items-center text-center p-5 max-w-[50%] text-gray-600">
          <h4 className="text-[15px] font-bold mb-5">STARBUCK® REWARDS</h4>
          <p className="text-[14px] max-w-[80%] leading-[1.7]">
            Join Starbucks Rewards to earn Stars for free food and drinks, any way you pay.
            Get access to mobile ordering, a birthday Reward, and{' '}
            <Link to="https://www.starbucks.com/rewards" className="text-gray-600 underline hover:no-underline">
              more
            </Link>.
          </p>
        </div>

        {/* Inline SignupForm */}
        <div className='flex flex-col bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl max-w-[500px] w-full'>
          <div className="p-12">
            <form onSubmit={handleSubmit(onSubmit)} className='relative w-full'>
              <h4 className='text-gray-800 text-[19px] mb-2'>Personal Information</h4>

              {/* First Name Field */}
              <div className="relative flex flex-col mb-2.5">
                <TextField
                  label="First name"
                  name="fName"
                  type="text"
                  slotProps={{ style: { color: "rgba(0,0,0,.56)" }, htmlInput: { style: { fontWeight: "400" } } }}
                  className='w-full'
                  error={!!errors.fName}
                  {...register("fName", { required: "Enter your first name.", onChange: clearSubmitError })}
                />
                {errors.fName && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                    <Close fontSize="small" className="text-red-500" />
                    <span>{errors.fName.message}</span>
                    <DangerousSharp fontSize="small" className="absolute right-[4%] top-0 translate-y-[90%] text-red-500" />
                  </div>
                )}
              </div>

              {/* Last Name Field */}
              <div className="relative flex flex-col mb-2.5">
                <TextField
                  label="Last name"
                  name="lName"
                  type="text"
                  slotProps={{ style: { color: "rgba(0,0,0,.56)" }, htmlInput: { style: { fontWeight: "400" } } }}
                  className='w-full'
                  error={!!errors.lName}
                  {...register("lName", { required: "Enter your last name.", onChange: clearSubmitError })}
                />
                {errors.lName && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                    <Close fontSize="small" className="text-red-500" />
                    <span>{errors.lName.message}</span>
                    <DangerousSharp fontSize="small" className="absolute right-[4%] top-0 translate-y-[90%] text-red-500" />
                  </div>
                )}
              </div>

              <h4 className='text-gray-800 text-lg mb-2 mt-4'>Account Security</h4>

              {/* Email Field */}
              <div className="relative flex flex-col mb-2.5">
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  slotProps={{ style: { color: "rgba(0,0,0,.56)" }, htmlInput: { style: { fontWeight: "400" } } }}
                  className='w-full'
                  error={!!errors.email}
                  {...register("email", { required: "Enter an email address.", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter a valid email address." }, onChange: clearSubmitError })}
                />
                {errors.email && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                    <Close fontSize="small" className='text-red-500' />
                    <span>{errors.email.message}</span>
                    <DangerousSharp fontSize="small" className="absolute right-[4%] top-0 translate-y-[90%] text-red-500" />
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className='relative flex flex-col mb-2.5'>
                <div className="relative">
                  <TextField
                    label="Password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    slotProps={{ style: { color: "rgba(0,0,0,.30)" }, htmlInput: { style: { fontWeight: "400" } } }}
                    className='w-full'
                    error={!!errors.password}
                    {...register("password", { required: "Enter a password.", pattern: passwordPattern, onChange: clearSubmitError })}
                  />
                  <div onClick={() => setPasswordShown(prev => !prev)} className='cursor-pointer text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
                    {passwordShown ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </div>
                </div>

                {errors.password && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                    <Close fontSize="small" className='text-red-500' />
                    <span>{errors.password.message}</span>
                  </div>
                )}
                <h5 className="text-gray-500 text-xs mt-2">Create a password 8 to 25 characters long that includes at least 1 uppercase and 1 lowercase letter, 1 number and 1 special character like an exclamation point or asterisk.</h5>
              </div>

              {/* Submit Error Display */}
              {submitError && (
                <div className="mt-4 mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                  {submitError}
                </div>
              )}

              <h4 className='text-gray-600 text-sm my-6'>Collect more Stars & Earn Rewards</h4>
              <span className='text-gray-800 font-semibold block'>Email is a great way to know about offers and what's new from Starbucks.</span>

              <div className="flex justify-end w-full mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-block z-10 px-6 py-4.5 bg-[#00a862] shadow-lg border-0 rounded-full text-white text-lg font-bold leading-tight overflow-hidden text-center transition-all duration-200 ease-in-out ml-auto cursor-pointer hover:shadow-xl hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupScreen;
