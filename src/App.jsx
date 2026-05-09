import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import Settings from "./pages/Settings";
import BrowsePets from "./pages/adopter/BrowsePets";
import MyApplications from "./pages/adopter/MyApplications";
import AddPet from "./pages/staff/AddPet";
import ManageListings from "./pages/staff/ManageListings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Navbar from "./components/Navbar";

function App(){
  const {state} =useAuthContext()

  return (
    <BrowserRouter>
    {state.isAuthenticated && <Navbar/>}
      <Routes>
        <Route path= "/" element={<Home/>}></Route>
        <Route path= "/profile" element={state.isAuthenticated?  <Profile/>: <Home/>}> </Route>
        <Route path="/settings" element={state.isAuthenticated?  <Settings/>: <Home/>}></Route>

        {/* Adopter routes*/}
        <Route path="/browse-pets" element={
          <ProtectedRoute allowedRoles={["adopter"]}>
            <BrowsePets/>
          </ProtectedRoute> 
        }></Route> 
        <Route path="/my-applications" element={
          <ProtectedRoute allowedRoles={["adopter"]}>
            <MyApplications/>
          </ProtectedRoute> 
        }></Route> 
        {/* shelter staff routes*/}
        <Route path="/add-pet" element={
          <ProtectedRoute allowedRoles={["shelter-staff"]}>
            <AddPet/>
          </ProtectedRoute> 
        }></Route> 
        <Route path="/manage-listings" element={
          <ProtectedRoute allowedRoles={["shelter-staff"]}>
            <ManageListings/>
          </ProtectedRoute> 
        }></Route> 
        {/* sAdmin routes*/}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard/>
          </ProtectedRoute> 
        }></Route> 

      </Routes>
    </BrowserRouter>
  )
}

export default App