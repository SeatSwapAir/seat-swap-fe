import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log(import.meta.env.VITE_AUTH0_DOMAIN);
console.log(import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log(import.meta.env.VITE_AUTH0_AUDIENCE);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
