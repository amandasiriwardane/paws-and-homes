import { API_BASE_URL } from "./config";

export const getAllUsers = async (token) =>{
    const response = await fetch(`${API_BASE_URL}/users`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return response.json()
}