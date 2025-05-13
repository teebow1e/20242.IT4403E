import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check';
import { firebaseApp } from './firebase';

// if (process.env.NODE_ENV === 'development') {
//   window.FIREBASE_APPCHECK_DEBUG_TOKEN = '56C0B8FC-9F19-46AF-9FDE-DABC5BDC14A8'; // debug token defined in firebase
//   console.log('Debug token enabled:', window.FIREBASE_APPCHECK_DEBUG_TOKEN);
// }

// Initialize App Check 
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LfMnjErAAAAAFV-3CfhiMTlFeqDqEKTs8VUKaw4'),
  isTokenAutoRefreshEnabled: true,
});

let currentToken = null;

// Debug code

// getToken(appCheck, false)
//   .then((result) => {
//     currentToken = result.token;
//     console.log('Initial App Check Token:', currentToken);
    
//     window.addEventListener('popstate', async () => {
//       const newToken = await getToken(appCheck, false);
//       console.log('App Check Token after navigation:', newToken.token);
//       console.log('Token unchanged:', currentToken === newToken.token);
//     });
//   })
//   .catch((error) => {
//     console.error('Error getting token:', error);
//   });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
