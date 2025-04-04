import React from 'react';
import { Link } from 'react-router-dom';
import './SignupScreen.css';
import Footer from './Footer';
import {auth} from './firebase';

function SignupScreen() {
  // const onSubmit = ({firstName, lastName, email, password}) => {
  //   auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      
  //   }
  // }
  return (
    <div className="signupScreen">
      <nav className="signupScreen__nav">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/logo.svg" alt="Starbucks" />
            </Link>
          </div>
        </div>
      </nav>
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
      <Footer />
    </div>
  );
}

export default SignupScreen;
