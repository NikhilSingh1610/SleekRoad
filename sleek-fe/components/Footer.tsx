import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log('beforeinstallprompt event fired');
      event.preventDefault(); // Prevent the default mini-infobar from appearing
      setDeferredPrompt(event); // Save the event for triggering later
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null); // Reset the deferred prompt
      });
    } else {
      alert('Install prompt is not available');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-white rounded border border-black flex items-center justify-center">
                <img src="/logo.svg" alt="SleekRoad Logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="font-bold text-xl">SleekRoad</span>
              <button
                onClick={handleInstallClick}
                className="ml-4 px-4 py-2 block md:hidden bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all"
              >
                Download App
              </button>
            </div>
            <p className="text-gray-400 text-sm hidden sm:block">
              A modern marketplace connecting college students and communities.
            </p>
          </div>
          
          <div className='hidden sm:block'>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                <Link href="/allitems">Browse Items</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/dashboard">Sell Items</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/allitems">Services</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/comp/help">Help & support</Link>
              </li>
            </ul>
          </div>
          
          <div className='hidden sm:block'>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                <Link href="/comp/about">About Us</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/comp/privacy">Privacy Policy</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/comp/terms">Terms of Service</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/comp/careers">Careers</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 SleekRoad. All rights reserved. <span className='hidden sm:block'>Made for local communities.</span></p>
        </div>
      </div>
    </footer>
  );
}