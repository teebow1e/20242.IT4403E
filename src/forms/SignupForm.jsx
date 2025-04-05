import {TextField, Button} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined} from '@mui/icons-material';

import './SignupForm.css'

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className='signupForm'>
        <div className="signupForm__container">
            <form onSubmit={handleSubmit(onSubmit)} className='signupForm__form'>
              <h4 className='signupForm__section'>Personal Information</h4>
              <div className="signupForm__inputContainer">
                <TextField 
                  label="* First name" 
                  name="fName" 
                  type="text" 
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "800" } }
                  }}
                  className='signupForm__input' 
                  // error={!!errors.fName}
                  {...register("First name", { required: true })}
                />
                {errors.fName && 
                  <div className="signupForm__error">
                    <Close fontSize="small" />
                    <span>Enter your first name.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="signupForm__reportIcon"
                    />
                  </div>
                }
              </div>

              <div className="signupForm__inputContainer">
                <TextField 
                  label="* Last name" 
                  name="lName" 
                  type="text" 
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "800" } }
                  }}
                  className='signupForm__input' 
                  // error={!!errors.lName}
                  {...register("Last name", { required: true })}
                />
                {errors.lName && 
                  <div className="signupForm__error">
                    <Close fontSize="small" />
                    <span>Enter your last name.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="signupForm__reportIcon"
                    />
                  </div>
                }
              </div>

              <h4 className='signupForm__section'>Account Security</h4>

              <div className="signupForm__inputContainer">
                <TextField 
                  label="Email Address" 
                  name="email" 
                  type="email" 
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "800" } }
                  }}
                  className='signupForm__input' 
                  // error={!!errors.email}
                  {...register("Last name", { required: true })}
                />
                {errors.email && 
                  <div className="signupForm__error">
                    <Close fontSize="small" />
                    <span>Enter an email.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="signupForm__reportIcon"
                    />
                  </div>
                }
              </div>

              <div className="signupForm__inputContainer">
                <TextField 
                  label="Email Address" 
                  name="email" 
                  type="email" 
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "800" } }
                  }}
                  className='signupForm__input' 
                  // error={!!errors.email}
                  {...register("Last name", { required: true })}
                />
                {errors.email && 
                  <div className="signupForm__error">
                    <Close fontSize="small" />
                    <span>Enter an email.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="signupForm__reportIcon"
                    />
                  </div>
                }
              </div>

              <div className='signupForm__inputContainer'>
                <TextField 
                  label="Password" 
                  name="password" 
                  type={passwordShown ? "text" : "password"}
                  slotProps={{
                    style: { color: "rgba(0,0,0,.30)" },
                    htmlInput: { style: { fontWeight: "800" } }
                  }}
                  className='signupForm__passwordInput'
                  {...register("Password", { required: true })}
                />
                {passwordShown ? (
                  <VisibilityOutlined
                    onClick={() => setPasswordShown((passwordShown)=> !passwordShown)}
                    className='signupForm__visibilityIcon'
                  />
                ) : (
                  <VisibilityOffOutlined
                    onClick={() => setPasswordShown((passwordShown)=> !passwordShown)}
                    className='signupForm__visibilityIcon'
                  />
                )}
  
                {errors.password && 
                  <div className="signupForm__error">
                    <Icon fontSize="small" />
                    <span>Enter a password</span>
                    <DangerousSharp
                      fontSize="small"
                      className="signupForm__reportIcon"
                    />
                  </div>
                }
              </div>
              
              <h4 className='signupForm__rewards'> 
                Collect more Stars & Earn Rewards
              </h4>
              <span className='signupForm__span'></span>
            </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;