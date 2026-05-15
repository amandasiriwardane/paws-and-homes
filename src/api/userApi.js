import { API_BASE_URL } from "./config";

export const getAllUsers = async (token) =>{
    const response = await fetch(`${API_BASE_URL}/users`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return response.json()
}

export const completeRegistration  = async (selectedRole,userId, userName, accessToken) =>{
    const response = await fetch(`${API_BASE_URL}/users/complete-registration`,{
        method : 'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
        selectedRole,
        userId,
        userName
        })
    })
    return response.json()
}