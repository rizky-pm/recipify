import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import Providers from './components/Providers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
