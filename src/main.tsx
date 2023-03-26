import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ThemeProvider from './theme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top';
import Router from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { inject } from '@vercel/analytics';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

inject();

const container = document.getElementById('root');
if (!container) throw new Error("Could not find root element with id 'root'");
// export const baseUrl = import.meta.env.BASE_URL;
export const baseUrl = '/';
const root = createRoot(container);
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
