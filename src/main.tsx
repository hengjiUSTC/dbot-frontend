import { Provider } from 'react-redux';
import { store } from './redux/store';
import ThemeProvider from './theme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top';
import Router from './routes';
import { HelmetProvider } from 'react-helmet-async';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

import ReactDOM from 'react-dom/client';
import './index.css';
import { inject } from '@vercel/analytics';

inject();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const baseUrl = '/';
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
