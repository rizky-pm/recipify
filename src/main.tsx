import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import Providers from './components/Providers.tsx';
import Footer from './components/Footer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
    <Footer />
  </React.StrictMode>
);
