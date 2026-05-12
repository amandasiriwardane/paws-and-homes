import React from 'react'
import {useState, useEffect} from 'react'
import { useUser } from '../../context/UserContext'
import { useAuthContext } from '@asgardeo/auth-react'
import { getAllPets, deletePet } from '../../api/petApi'

function ManageListings() {

  const { getAccessToken}= useAuthContext()
  const {userInfo}=useUser()
  const [pets, setPets] = useState([])
  const [message, setMessage]= useState('')

  useEffect(()=>{
    getAllPets().then( data =>{
        //filter only staff pets
        const myPets = data.filter(pet =>
            pet.shelter_id === userInfo?.id
        )
        setPets(myPets)
    })
  }, [userInfo])

  const handleDelete = async (id) =>{
    try{
        const token = await getAccessToken()
        await deletePet(id, token)
        setPets(pets.filter(pet => pet.id != id))
        setMessage('Pet deleted!')
    } catch(error){
        setMessage('Delete Failed!')
    }
  }
  return (
    <div>
        <h2>My listings</h2>
        {pets.length===0?(
            <p>No pets listed yet!</p> 
        ): (
            pets.map(pet =>(
                <div key={pet.id}>
                    <p>{pet.name}-{pet.species}</p>
                    <button onClick={()=>handleDelete(pet.id)}>Delete</button>
                </div>
            ))
        )}
        {message && <p> {message}</p>}
    </div>
  )
}

export default ManageListings