import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "@asgardeo/auth-react";
import { UserProvider } from './context/UserContext.jsx';

const isLocal = window.location.hostname==="localhost";
const redirectURL = isLocal
? "http://localhost:5173"
: "https://7ca53e5e-c8a3-40ba-9e30-38244d911794.e1-eu-west-cdp.choreoapps.dev"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      
      config={ {
            signInRedirectURL: redirectURL,
            signOutRedirectURL: redirectURL,
            clientID: "YP1fP4DlfZSs7fkrMI6hHjpzlyAa",
            baseUrl: "https://api.eu.asgardeo.io/t/orgama",
            scope: [ "openid","profile","email","address", "phone" , "internal_login" ],
            resourceServerURLs:[
              "https://api.eu.asgardeo.io/t/orgama/scim2/Me"
            ]
        } }
    >
      <UserProvider>
        <App />
      </UserProvider>
      
    </AuthProvider>
    
  </StrictMode>,
)
