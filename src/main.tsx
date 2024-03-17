import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import Providers from './components/Providers.tsx';
import Footer from './components/Footer.tsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
    <Footer />
  </React.StrictMode>
);
