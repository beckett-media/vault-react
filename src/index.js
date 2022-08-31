import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './app/components/ScrollToTop/ScrollToTop';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-MKJ4MQF',
};

TagManager.initialize(tagManagerArgs);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
