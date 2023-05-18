import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';

import router from './routes';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#5ef38c',
            borderRadius: 3,
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>
);
