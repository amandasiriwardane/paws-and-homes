import { useState , useEffect, useRef} from 'react'
import { useAuthContext } from '@asgardeo/auth-react'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'
import "../styles/home.css"
import { completeRegistration } from '../api/userApi'

function Home() {
  const {state, signIn, signOut, getAccessToken } = useAuthContext()
  //const [isAssigning, setIsAssigning]=useState(false)
  const {userInfo, userRole, needsRoleAssignment, requestedRole, refreshUser} =useUser()
  const hasAttemptedAssignment = useRef(false);

/*
useEffect(() => {
  const handleRegistration = async () => {
    if (!requestedRole || !userRole=== null) return;
    if (isAssigning) return;

    if (state.isAuthenticated && needsRoleAssignment && requestedRole && userInfo?.id) {
      setIsAssigning(true)
      try {
        const token = await getAccessToken();
        console.log(token)
        const idToken = state.idToken;
        console.log(idToken)
        console.log("USER INFO:", userInfo);
        console.log("USER INFO ID:", userInfo?.id);
        const data = await completeRegistration(requestedRole, userInfo.id, userInfo.userName, token);

        if (data.message === 'Role assigned successfully!') {
          await refreshUser();
          setTimeout(async () => {
            await signOut();
          }, 1000);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  handleRegistration()
}, [state.isAuthenticated, needsRoleAssignment]);
 */
  useEffect(() => {
    const handleRegistration = async () => {
      if (hasAttemptedAssignment.current) return; // ← stop repeat calls
      if (!state.isAuthenticated || !needsRoleAssignment || !requestedRole) return;
      
      hasAttemptedAssignment.current = true; // ← set flag immediately
      
      try {
        const token = await getAccessToken();
        //console.log("Token:", token ? "exists": "null/undefined")
        const data = await completeRegistration(requestedRole, token);
        
        if (data.message === 'Role assigned successfully!') {
          setTimeout(async () => {
            await signOut();
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        hasAttemptedAssignment.current = false; // reset on error
      }
    };
  
  handleRegistration();
}, [state.isAuthenticated, needsRoleAssignment]);


  return (
    <div className='home-container'>  
      {state.isAuthenticated? (
        <div>
          <h1 className='welcome-title'>Welcome {userInfo?.name?.givenName || userInfo?.username} !</h1>
          <span className='welcome-role'>Role: {userRole}</span>

        </div>
      ) :(
        <div>
          <h1 className='home-title'>Paws and Homes</h1>
          <p className='home-subtitle'> Find your Perfect pet companion!</p>
          <button className='login-btn' onClick={ ()=> signIn()}>Sign Up or Register!</button>
        </div>
      )
    }
    </div>
  )
}

export default Home
