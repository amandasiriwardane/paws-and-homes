import { useState } from 'react'
import { useAuthContext } from '@asgardeo/auth-react'

function App() {
  const {state, signIn, signOut} = useAuthContext()

  return (
    <>
    {
      state.isAuthenticated? (
        <div>
          <p>Welcome {state.username} !</p>
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

export default App
