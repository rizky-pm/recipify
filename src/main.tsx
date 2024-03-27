import React from 'react';
import ReactDOM from 'react-dom/client';

import './global.css';
import Providers from './components/Providers.tsx';
import Footer from './components/Footer.tsx';

const pathName = window.location.pathname;
const hideFooterPages = ['/offline'];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='flex flex-col min-h-screen relative'>
      <Providers />
      <Footer showFooter={!hideFooterPages.includes(pathName)} />
    </div>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceworker.js')
      .then((registration) => {
        console.log('Service worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service worker registration failed:', error);
      });
  });
}
