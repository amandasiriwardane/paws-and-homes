import { useState, useEffect } from "react"
import { useAuthContext } from "@asgardeo/auth-react"
import '../../styles/pets.css';
import { getAllUsers } from '../../api/userApi'


function AdminDashboard() {
  const {getAccessToken} = useAuthContext()
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(()=>{
    const fetchUsers = async ()=>{
      try{
        const token = await getAccessToken()
        const data = await getAllUsers(token)
        //console.log('Users data:', data)
        setUsers(data.Resources || [])
      } catch(err){
          setMessage('Failed to load users!')
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>
      {message && <p className="error-msg">{message}</p>}
      <div>
        {(users || []).map(user => (
          <div key={user.id} className="pet-card">
            <h3>{user.name?.givenName} {user.name?.familyName}</h3>
            <p>Email:{user.emails?.[0]}</p>
            <p>Username:{user.userName}</p>
            <p>Roles:{user.roles?.map(r=>r.display).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard