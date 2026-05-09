import { Link } from "react-router-dom"
import { useAuthContext } from "@asgardeo/auth-react"
import { useUser } from "../context/UserContext"
import "../styles/navbar.css"

function Navbar() {
    const {signOut} =useAuthContext()
    const {userInfo, userRole} =useUser()
  return (
    <nav className="navbar"> 
        <div>
            <Link to ="/" className="navbar-brand"> Paws & Homes</Link>
        </div>

        <div className="navbar-links">
            {/*adopter nav*/}
          {userRole==="adopter" &&(
            <>
            <Link to ="/browse-pets" className="navbar-link">Browser Pets</Link>
            <Link to ="/my-applications" className="navbar-link">My Applications</Link>
            </>
          )}
        
          {/*shelter staff nav*/}
          {userRole==="shelter-staff" &&(
            <>
            <Link to ="/add-pet" className="navbar-link">Add New Pet</Link>
            <Link to ="/manage-listings" className="navbar-link">Manage my Listings</Link>
            </>
          )}

          {/*admin nav*/}
          {userRole==="admin" &&(
            <>
            <Link to ="/admin" className="navbar-link">Admin Dashboard</Link>
            
            </>
          )}
          <Link to="/profile" className="navbar-link"> View Profile</Link>
          <Link to="/settings" className="navbar-link"> Settings</Link>
          <button  className="logout-btn" onClick={()=> signOut()}>Logout</button>
        </div>
    </nav>
  )
}

export default Navbar