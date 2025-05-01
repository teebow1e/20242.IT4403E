import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../forms/SignupForm';

function SignupScreen() {
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

          <SignupForm />
        </div>
      </>
    );
  }


export default SignupScreen;
