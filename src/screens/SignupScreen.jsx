import React from 'react';
import { Link } from 'react-router-dom';
import './SignupScreen.css';

function SignupScreen() {
  // const onSubmit = ({firstName, lastName, email, password}) => {
  //   auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      
  //   }
  // }
  return (
    <div className="signupScreen">
      <div className="signupScreen__info">
        <h1>Create an account</h1>
      </div>
      <div className="signupScreen__main">  
        <div className='signupScreen__rewards'>
          <h4>STARBUCK® REWARDS</h4>
          <p>Join Starbucks Rewards to earn Stars for free food and drinks, any way you pay. 
            Get access to mobile ordering, a birthday Reward, 
            and <Link href='https://www.starbucks.com/rewards'>more</Link>.</p>
        </div>
        {/* <SignupForm /> */}
      </div>
    </div>
  );
}

export default SignupScreen;