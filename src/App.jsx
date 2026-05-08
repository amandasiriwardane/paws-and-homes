import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import Settings from "./pages/Settings";

function App(){
  const {state} =useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Home/>}></Route>
        <Route 
          path= "/profile" element={state.isAuthenticated?  <Profile/>: <Home/>}>
        </Route>
        <Route path="/settings" element={state.isAuthenticated?  <Settings/>: <Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App