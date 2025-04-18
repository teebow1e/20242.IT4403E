import {TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Close, DangerousSharp, VisibilityOffOutlined, VisibilityOutlined} from '@mui/icons-material';
import FormSubmit from '../forms/FormSubmit';
import {auth} from '../Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // auth.onAuthStateChanged((user) => {
  //   if (user === null) {
  //     console.log('User is currently signed out!');
  //   } else {
  //     console.log('User is signed in!');
  //   }
  // });

  const onSubmit = ({fName, lName, email, password}) => {
    try{
      createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: fName + " " + lName,
          }));
          navigate("/");
        })
        .catch((e) => {
          if (e.code === 'auth/email-already-in-use') {
            alert('Email already in use!');
          } else if (e.code === 'auth/invalid-email') {
            alert('Invalid email!');
          } else if (e.code === 'auth/weak-password') {
            alert('Weak password!');
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className='flex flex-col shadow-lg rounded-xl max-w-[500px] h-full'>
        <div className="px-5 py-0 sm:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className='relative w-full'>
              <h4 className='text-[rgba(0,0,0,0.87)] text-[19px] mb-2'>Personal Information</h4>
              <div className="relative flex flex-col mb-2.5">
                <TextField
                  label="First name"
                  name="fName"
                  type="text"
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className='w-full'
                  // error={!!errors.fName}
                  {...register("fName", { required: true })}
                />
                {errors.fName &&
                  <div className="mt-1.5 flex items-center gap-[5px] text-sm">
                    <Close fontSize="small" className="text-[#e75b52]"/>
                    <span>Enter your first name.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-[90%]"
                    />
                  </div>
                }
              </div>

              <div className="relative flex flex-col mb-2.5">
                <TextField
                  label="Last name"
                  name="lName"
                  type="text"
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className='w-full'
                  // error={!!errors.lName}
                  {...register("lName", { required: true })}
                />
                {errors.lName &&
                  <div className="mt-1.5 flex items-center gap-[5px] text-sm">
                    <Close fontSize="small" />
                    <span>Enter your last name.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-[90%]"
                    />
                  </div>
                }
              </div>

              <h4 className='text-[rgba(0,0,0,0.87)] text-[19px] mb-2 mt-4'>Account Security</h4>

              <div className="relative flex flex-col mb-2.5">
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  slotProps={{
                    style: { color: "rgba(0,0,0,.56)" },
                    htmlInput: { style: { fontWeight: "400" } }
                  }}
                  className='w-full'
                  // error={!!errors.email}
                  {...register("email", { required: true })}
                />
                {errors.email &&
                  <div className="signupForm__error">
                    <Close fontSize="small" />
                    <span>Enter an email.</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-[90%]"
                    />
                  </div>
                }
              </div>

              <div className='relative flex flex-col mb-2.5'>
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
                  <div className="mt-[5px] flex items-center gap-[5px] text-sm">
                    <Close fontSize="small" />
                    <span>Enter a password</span>
                    <DangerousSharp
                      fontSize="small"
                      className="absolute right-[4%] top-0 translate-y-[90%]"
                    />
                  </div>
                }
                <h5>Create a password 8 to 25 characters long that includes at least 1 uppercase and 1 lowercase letter, 1 number and 1 special character like an exclamation point or asterisk.</h5>
              </div>

              <h4 className='text-[rgba(0,0,0,0.56)] text-[13px] sm:text-[14px] my-6'>
                Collect more Stars & Earn Rewards
              </h4>
              <span className='text-[rgba(0,0,0,0.87)] font-semibold text-[14px] sm:text-base'>
                Email is a great way to know about offers and what&apos;s new from Starbucks.
              </span>
              <FormSubmit name='Create account' type='submit'>Sign up</FormSubmit>
            </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
