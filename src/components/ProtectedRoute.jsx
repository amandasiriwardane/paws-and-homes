import React from 'react'
import { useUser } from '../context/UserContext'
import AccessDenied from '../pages/AccessDenied'

function ProtectedRoute({children, allowedRoles}) {
  const {userRole}=useUser()

  if (!allowedRoles.includes(userRole)){
    return <AccessDenied/>
  }
  return children
}

export default ProtectedRoute