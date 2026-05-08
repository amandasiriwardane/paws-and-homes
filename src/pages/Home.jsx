import { useState , useEffect} from 'react'
import { useAuthContext } from '@asgardeo/auth-react'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'

function Home() {
  const {state, signIn, signOut } = useAuthContext()
  const {userInfo} = useUser()

  return (
    <>
    {
      state.isAuthenticated? (
        <div>
          <h1>Welcome {userInfo?.name?.givenName || userInfo?.username} !</h1>
          <p>Email: {userInfo?.emails?.[0]} </p>
          <Link to="/profile"> View Profile</Link>
          <Link to="/settings"> Settings</Link>
          <button onClick={()=> signOut()}>Logout</button>
        </div>
      ) :(
        <div>
          <button onClick={ ()=> signIn()}>Login</button>
        </div>
      )
    }
    </>
  )
}

export default Home
