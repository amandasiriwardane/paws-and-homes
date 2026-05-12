import { API_BASE_URL } from "./config";

export const getAllPets = async () =>{
    const response = await fetch(`${API_BASE_URL}/pets`)
    return response.json()
}

export const createPet = async (petData, accessToken) =>{
    const response = await fetch(`${API_BASE_URL}/pets`,{
        method : 'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(petData)
    })
    return response.json()
}

export const deletePet = async (id, accessToken) =>{
    const response = await fetch(`${API_BASE_URL}/pets/${id}`,{
        method : 'DELETE',
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return response.json()
}

export const updatePet = async (id,petData, accessToken) =>{
    const response = await fetch(`${API_BASE_URL}/pets/${id}`,{
        method : 'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body:JSON.stringify(petData)
    })
    return response.json()
}