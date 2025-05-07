import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App.jsx'
// import * as serviceWorker from './serviceWorker.js'
// import PlayGround from './database/PlayGround.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <PlayGround /> */}
  </StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();