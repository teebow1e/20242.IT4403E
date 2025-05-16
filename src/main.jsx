import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'
// import { getToken } from 'firebase/app-check';
// import { appCheck } from './firebase';

// let currentToken = null;
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
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
