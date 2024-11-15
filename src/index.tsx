import React from 'react';
import * as ReactDom from 'react-dom/client';
import 'config/configureMobX';
import 'styles/index.scss';
import App from './App';
import * as Router from 'react-router-dom';

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <App />
    </Router.BrowserRouter>
  </React.StrictMode>,
);
