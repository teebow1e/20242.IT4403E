import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {TextField} from '@mui/material';
import {Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined} from '@mui/icons-material';
import FormSubmit from '../forms/FormSubmit';
import {auth} from '../firebase';
import {login} from '../features/UserSlice';
import { useDispatch } from 'react-redux';
import {signInWithEmailAndPassword} from 'firebase/auth';

function LoginScreen() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();

  // Firebase Auth
  const onSubmit = ({email, password}) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then((userAuth) =>{
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName
        }));
      })
      .catch((e) => {
        if (e.code == "auth/invalid-credential"){
          alert("Wrong email or password!");
        }
      })
    } catch(e) {
      console.log("Something wrong!", e);
      alert("Wrong email or password!");
    }
  }
  return (
    <div>
      <div>
        <div className="grid place-items-center w-full h-full text-sm mt-8 mb-8">
            {/* grid place-items-center w-full h-full text-sm mt-8 mb-8 */}
          <h1>Sign in or create an account</h1>
        </div>
        <div className="grid place-items-center flex-1">
          <div className="flex flex-col loginScreen-boxshad rounded-xl p-12 max-w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className='min-w-[500px] min-h-[150px] flex flex-col lg:min-w-[400px] md:min-w-[300px]'>
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
                  {...register("email", { required: true })}
                />
                {errors.email &&
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <Close fontSize="small" className="text-[#e75b52]"/>
                    <span>Enter an email/username.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-full text-[#e75b52]"
                    />
                  </div>
                }
              </div>

              <div className='relative flex flex-col mb-5'>
                <TextField
                  label="Password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  slotProps={{
                    style: { color: "rgba(0,0,0,.30)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className='w-full'
                  {...register("password", { required: true })}
                />
                {passwordShown ? (
                  <VisibilityOutlined
                    onClick={() => setPasswordShown((passwordShown)=> !passwordShown)}
                    className='cursor-pointer text-gray-500 absolute right-[11%] translate-y-[70%]'
                  />
                ) : (
                  <VisibilityOffOutlined
                    onClick={() => setPasswordShown((passwordShown)=> !passwordShown)}
                    className='cursor-pointer text-gray-500 absolute right-[11%] translate-y-[70%]'
                  />
                )}

                {errors.password &&
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <Close fontSize="small" className="text-[#e75b52]"/>
                    <span>Enter a password</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-full text-[#e75b52]"
                    />
                  </div>
                }
              </div>

              <div className='mt-5'>
              <Link className="block mb-4 text-[#00653e] font-extrabold text-sm hover:no-underline">Forgot your username?</Link>
              <Link className="block mb-4 text-[#00653e] font-extrabold text-sm hover:no-underline">Forgot your password?</Link>
              </div>

              <FormSubmit name="Sign in" type="submit" variant='contained'>Sign in</FormSubmit>
            </form>
          </div>
          <div className='grid place-items-center text-center p-5 px-10 text-[#00653e] max-w-[50%] lg:max-w-[70%] md:max-w-[90%]'>
          <h4 className="text-xs font-normal mb-3">JOIN STARBUCK® REWARDS</h4>
          <p className="text-xs text-black mb-3 leading-relaxed">As a member, start earning free food and drinks, unlock our best offers and celebrate your birthday with a treat from us. Best of all, it's free to join.</p>          </div>
          <div className='w-full flex justify-center items-center mb-8 mx-auto max-w-[300px]'>
            <Link to="/account/create" className="inline-block bg-transparent border border-solid rounded-full no-underline text-[#00653e] font-semibold text-sm py-1 px-4 leading-relaxed hover:bg-[rgba(0,86,62,0.06)]">Join now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
