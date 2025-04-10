import { useState } from 'react';
import { useEffect } from 'react';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function startRandomNotificationLoop() {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

    const messages = [
      "☀️ It's sunny outside!",
      "🌧️ Rain is on the way!",
      "🌬️ Windy conditions ahead.",
      "⛅ Partly cloudy now.",
      "🌡️ Temperature is rising!",
      "❄️ Cold front moving in.",
    ];

    const notify = () => {
      const message = messages[Math.floor(Math.random() * messages.length)];

      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("🌤️ Weather Update", {
          body: message,
          icon: '/pwa-192x192.png',
          tag: 'weather-' + Math.random().toString(36).substring(2, 8),
        });
      });
    };

    // Trigger every 1 min
    setInterval(() => {
      if (Notification.permission === 'granted') {
        console.log("notification sent!");
        notify();
      }
    }, 20000);
  }


function App() {
  const [count, setCount] = useState(0)
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    } else {
      startRandomNotificationLoop();
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} className="logo" alt="pwa1 logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>pwa1</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
      {isOnline ? '✅ Great! You are online!' : '❌ Please connect to the Internet.'}
      </p>
      <PWABadge />
    </>
  )
}

export default App
