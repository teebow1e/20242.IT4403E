import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function VerifyEmailScreen() {
  const [verificationStatus, setVerificationStatus] = useState('checking');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setVerificationStatus('verified');
          setTimeout(() => navigate('/'), 3000);
        } else {
          setVerificationStatus('unverified');
        }
      } else {
        setVerificationStatus('error');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="max-w-[500px] mx-auto mt-8 p-6">
      {verificationStatus === 'checking' && (
        <div className="text-center">
          <p>Checking verification status...</p>
        </div>
      )}

      {verificationStatus === 'verified' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#00653e]">Email Verified!</h2>
          <p>Redirecting to homepage...</p>
        </div>
      )}

      {verificationStatus === 'unverified' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Email not verified</h2>
          <p>Please check your email and click the verification link.</p>
        </div>
      )}

      {verificationStatus === 'error' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Error</h2>
          <p>Please try signing in again.</p>
          <button
            onClick={() => navigate('/account/signin')}
            className="mt-4 px-6 py-2 bg-[#00653e] text-white rounded-full"
          >
            Go to Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailScreen;