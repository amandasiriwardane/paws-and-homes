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
    <div className='page-container'>
        <h2 className='page-title'>My listings</h2>
        <div className='pet-grid'>
            {pets.length===0?(
                <p>No pets listed yet!</p> 
            ): (
                pets.map(pet =>(
                    <div key={pet.id} className='pet-card'>
                        <h3>{pet.name}</h3>
                        <p>Species:{pet.species}</p>
                        <p>Breed:{pet.breed}</p>
                        <p>Age:{pet.age}</p>
                        <span className={`pet-status status-${pet.status.toLowerCase()}`}> 
                            {pet.status}
                        </span>
                        <div className='pet-actions'>
                        <button onClick={()=>handleDelete(pet.id)} className='delete-btn'>Delete</button>
                        </div>
                    </div>
                ))
            )}
            {message && <p> {message}</p>}
        </div>
    </div>
  )
}

export default ManageListings