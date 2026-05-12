import React from 'react'
import { useEffect, useState } from 'react'
import { getAllPets } from '../../api/petApi'

function BrowsePets() {
  const [pets, setPets] = useState([]);

  useEffect(()=>{
    getAllPets().then(data=>{
        console.log('Pets:', data)
        setPets(data)
    })
  }, [])

  return (
    <div>
        <h1>Browser Pets</h1>
        {pets.map(pet =>(
            <div key ={pet.id}>
                <p>{pet.name} - {pet.species}</p>
            </div>
        ))}
    </div>
  )
}

export default BrowsePets