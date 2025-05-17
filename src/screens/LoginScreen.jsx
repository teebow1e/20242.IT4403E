import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
import { Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import FormSubmit from '../forms/FormSubmit';
import { auth } from '../firebase';
import { login } from '../features/UserSlice';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [passwordShown, setPasswordShown] = useState(false);
    const dispatch = useDispatch();

    // Firebase Auth
    const onSubmit = async ({ email, password }) => {
        try {
            const userAuth = await signInWithEmailAndPassword(auth, email, password);
            
            // Check if email is verified
            if (!userAuth.user.emailVerified) {
                await auth.signOut();
                alert("Please verify your email before logging in. Check your inbox for the verification link.");
                return;
            }

            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName
            }));
        } catch (e) {
            console.log("Something wrong!", e);
            if (e.code === "auth/invalid-credential") {
                alert("Wrong email or password!");
            }
        }
    }
    return (
        <div>
            <div className="grid place-items-center w-full h-full text-sm mt-8 mb-8">
                <h1 className="text-[32px] font-bold text-black text-center">Sign in</h1>
            </div>
            <div className="flex-1 w-full grid place-items-center px-4">
                <div className="flex flex-col bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-xl max-w-[500px] w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className='p-12'>
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
                                    <Close fontSize="small" className="text-[#e75b52]" />
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
                                    onClick={() => setPasswordShown((passwordShown) => !passwordShown)}
                                    className='cursor-pointer text-gray-500 absolute right-[5%] translate-y-[70%]'
                                />
                            ) : (
                                <VisibilityOffOutlined
                                    onClick={() => setPasswordShown((passwordShown) => !passwordShown)}
                                    className='cursor-pointer text-gray-500 absolute right-[5%] translate-y-[70%]'
                                />
                            )}

                            {errors.password &&
                                <div className="mt-1 flex items-center gap-1 text-xs">
                                    <Close fontSize="small" className="text-[#e75b52]" />
                                    <span>Enter a password</span>
                                    <DangerousSharp
                                        fontSize="small"
                                        className="absolute right-[4%] top-0 translate-y-full text-[#e75b52]"
                                    />
                                </div>
                            }
                        </div>

                        <div className='mt-5'>
                            <Link to="/account/forgot-password" className="block mb-4 text-[#00653e] font-extrabold text-sm hover:no-underline">Forgot your password?</Link>
                        </div>

                        <div className="flex justify-end w-full mt-4">
                            <FormSubmit name="Sign in" type="submit" variant='contained'>Sign in</FormSubmit>
                        </div>
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
    );
}

export default LoginScreen;
