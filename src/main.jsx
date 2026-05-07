import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "@asgardeo/auth-react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      config={ {
            signInRedirectURL: "import.meta.env.VITE_RIDIRECT_URL",
            signOutRedirectURL: "import.meta.env.VITE_RIDIRECT_URL",
            clientID: "YP1fP4DlfZSs7fkrMI6hHjpzlyAa",
            baseUrl: "https://api.eu.asgardeo.io/t/orgama",
            scope: [ "openid","profile" ]
        } }
    >
      <App />
    </AuthProvider>
    
  </StrictMode>,
)
