import { useEffect, useState } from 'react'
import { getAllPets, deletePet } from '../../api/petApi'
import { useUser } from '../../context/UserContext';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';
import '../../styles/pets.css';

function BrowsePets() {
  const{userInfo, userRole} = useUser()
  const {getAccessToken} = useAuthContext()
  const [pets, setPets] = useState([]);
  

  useEffect(()=>{
    getAllPets().then(data=>{
        setPets(data)
    })
  }, [])

  const handleDelete = async(id) =>{
    const token = await getAccessToken()
    await deletePet(id, token)
    setPets(pets.filter(p => p.id != id))
  }

  return (
    <div className='page-container'>
        <h1 className='page-title'>Browser Pets</h1>
        <div className='pets-grid'>{pets.map(pet =>(
            <div key ={pet.id} className='pet-card'>
                <h3>{pet.name}</h3>
                <p>Species:{pet.species}</p>
                <p>Breed:{pet.breed}</p>
                <p>Age:{pet.age}</p>
                <span className={`pet-status status-${pet.status.toLowerCase()}`}> 
                    {pet.status}
                </span>

                {/* only show edit to shelter staff*/}
                {userRole ==='shelter-staff' &&
                    pet.shelter_id ===userInfo?.id && (
                        <div className='pet-actions'>
                        <Link to={`/edit-pet/${pet.id}`} className='edit-btn'>Edit</Link>
                        <button onClick={()=> handleDelete(pet.id)} className='delete-btn'>Delete </button>
                        </div>
                    )
                }
            </div>
        ))}
        </div>
    </div>
  )
}

export default BrowsePets