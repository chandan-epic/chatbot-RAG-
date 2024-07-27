import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-4r3rjx74qa1yojds.us.auth0.com"
      clientId="OlMgO3E1pAh2LjbNyYvyvMidJ3iRpeUn"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/userpage'
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);