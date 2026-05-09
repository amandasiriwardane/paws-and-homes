import { useState , useEffect} from 'react'
import { useAuthContext } from '@asgardeo/auth-react'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'
import "../styles/home.css"

function Home() {
  const {state, signIn, signOut } = useAuthContext()
  const {userInfo, userRole} = useUser()

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
          <button className='login-btn' onClick={ ()=> signIn()}>Login</button>
        </div>
      )
    }
    </div>
  )
}

export default Home
