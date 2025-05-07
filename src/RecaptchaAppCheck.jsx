import { useEffect } from 'react';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { firebaseApp } from './firebase'; 

const siteKey = "6LfMnjErAAAAAFV-3CfhiMTlFeqDqEKTs8VUKaw4"; 

function RecaptchaAppCheck() {
  useEffect(() => {
    if (!window.__FIREBASE_APPCHECK_INITIALIZED) {
      initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
      window.__FIREBASE_APPCHECK_INITIALIZED = true;
    }
  }, []);

  return null;
}

export default RecaptchaAppCheck;
