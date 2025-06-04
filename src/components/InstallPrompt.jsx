import React, { useState, useEffect } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode (installed PWA)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }

      // Check if running in PWA mode on iOS
      if (window.navigator.standalone === true) {
        setIsInstalled(true);
        return;
      }

      // Check if installed via Chrome/Edge
      if (document.referrer.includes('android-app://')) {
        setIsInstalled(true);
        return;
      }
    };

    checkIfInstalled();

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired');
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);

      // Optional: Track installation
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install', {
          method: 'browser_prompt'
        });
      }
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support beforeinstallprompt
      showManualInstallInstructions();
      return;
    }

    setIsInstalling(true);

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`User response to the install prompt: ${outcome}`);

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        // The appinstalled event will handle the UI updates
      } else {
        console.log('User dismissed the install prompt');
        setIsInstalling(false);
      }

      // Clear the deferredPrompt since it can only be used once
      setDeferredPrompt(null);
      setShowInstallButton(false);

    } catch (error) {
      console.error('Error during installation:', error);
      setIsInstalling(false);
    }
  };

  const showManualInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let instructions = '';

    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
      instructions = 'To install this app:\n1. Click the three dots menu (⋮) in the top right\n2. Select "Install Meowbucks..." or "Add to Home screen"';
    } else if (userAgent.includes('firefox')) {
      instructions = 'To install this app:\n1. Click the three lines menu (≡) in the top right\n2. Select "Install this site as an app"';
    } else if (userAgent.includes('safari')) {
      instructions = 'To install this app:\n1. Tap the Share button (□↗)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right';
    } else if (userAgent.includes('edg')) {
      instructions = 'To install this app:\n1. Click the three dots menu (⋯) in the top right\n2. Select "Apps" > "Install this site as an app"';
    } else {
      instructions = 'To install this app, look for an "Install" or "Add to Home Screen" option in your browser menu.';
    }

    alert(instructions);
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return null;
  }

  // Don't show if the install prompt is not available and we're not on a supported browser
  if (!showInstallButton && !deferredPrompt) {
    // Only show on browsers that might support manual installation
    const userAgent = navigator.userAgent.toLowerCase();
    const supportedBrowsers = ['chrome', 'firefox', 'safari', 'edge'];
    const isSupported = supportedBrowsers.some(browser => userAgent.includes(browser));

    if (!isSupported) {
      return null;
    }
  }

  return (
    <button
      onClick={handleInstallClick}
      disabled={isInstalling}
      className="flex items-center px-3 py-1.5 text-sm font-medium border border-[#006241] text-[#006241] rounded-full hover:bg-[#006241] hover:text-white transition-all duration-200 disabled:opacity-50"
      title="Install Meowbucks app"
    >
      {isInstalling ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Installing...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Install App
        </>
      )}
    </button>
  );
}

export default InstallPrompt;
