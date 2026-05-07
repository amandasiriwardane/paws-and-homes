import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "@asgardeo/auth-react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      config={ {
            signInRedirectURL: "https://7ca53e5e-c8a3-40ba-9e30-38244d911794.e1-eu-west-cdp.choreoapps.dev",
            signOutRedirectURL: "https://7ca53e5e-c8a3-40ba-9e30-38244d911794.e1-eu-west-cdp.choreoapps.dev",
            clientID: "YP1fP4DlfZSs7fkrMI6hHjpzlyAa",
            baseUrl: "https://api.eu.asgardeo.io/t/orgama",
            scope: [ "openid","profile" ]
        } }
    >
      <App />
    </AuthProvider>
    
  </StrictMode>,
)
