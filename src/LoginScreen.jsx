import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {TextField} from '@mui/material';
import {Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined} from '@mui/icons-material';
import './LoginScreen.css';
import FormSubmit from './FormSubmit';
import Footer from './Footer';
import {auth} from './firebase';
import {login} from './features/UserSlice';
import { useDispatch } from 'react-redux';

function LoginScreen() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();

  // Firebase Auth
  const onSubmit = ({email, password}) => {
    auth.SignInWithEmailAndPassword(email, password).then((userAuth) => {
      dispatch(login({
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: userAuth.user.displayName
      }))
    }).catch((error) => alert(error.message));
  }
  return (
    <div>
      <div className="loginScreen">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <Link to="/">
                <img src="/logo.svg" alt="Starbucks" />
              </Link>
            </div>
          </div>
        </nav>
        <div className="loginScreen__info">
          <h1>Sign in or create an account</h1>
        </div>
        <div className="loginScreen__main">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='loginScreen__inputContainer'>
              <TextField 
                label="Username or email address" 
                name="email" 
                type="email" 
                slotProps={{
                  style: { color: "rgba(0,0,0,.56)" },
                  htmlInput: { style: { fontWeight: "800" } }
                }}
                className='loginScreen__emailInput'
                {...register("Username or email", { required: true })}
              />
              {errors.email && 
                <div className="loginScreen__error">
                  <Close fontSize="small" />
                  <span>Enter an email/username</span>
                  <DangerousSharp
                    fontSize="small"
                    className="loginScreen__reportIcon"
                  />
                </div>
              }

              <TextField 
                label="Password" 
                name="password" 
                type={passwordShown ? "text" : "password"}
                slotProps={{
                  style: { color: "rgba(0,0,0,.56)" },
                  htmlInput: { style: { fontWeight: "800" } }
                }}
                className='loginScreen__passwordInput'
                {...register("Password", { required: true })}
              />
              {passwordShown ? (
                <VisibilityOutlined
                  onClick={() => setPasswordShown((passwordShown)=> !passwordShown)}
                  className='loginScreen__visibilityIcon'
                />
              ) : (
                <VisibilityOffOutlined
                  onClick={() => setPasswordShown((passwordShown)=> !passwordShown)}
                  className='loginScreen__visibilityIcon'
                />
              )}

              {errors.password && 
                <div className="loginScreen__error">
                  <Icon fontSize="small" />
                  <span>Enter a password</span>
                  <DangerousSharp
                    fontSize="small"
                    className="loginScreen__reportIcon"
                  />
                </div>
              }

              <div className='loginScreen__resetLink'>
                <Link >Forgot your username?</Link>
                <Link >Forgot your password?</Link>
              </div>

              <FormSubmit name="Sign in" type="submit" variant='contained'>Sign in</FormSubmit>
            </div>
          </form>
          <div className='loginScreen__rewards'>
              <h4>JOIN STARBUCK® REWARDS</h4>
              <p>As a member, start earning free food and drinks, unlock our best offers and celebrate your birthday with a treat from us. Best of all, it's free to join.</p>
          </div>
          <div className='loginScreen__joinNow'>
            <Link to="/account/create">Join now</Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginScreen;
