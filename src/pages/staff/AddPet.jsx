import React, { useState } from 'react'
import { useAuthContext } from '@asgardeo/auth-react'
import { createPet } from '../../api/petApi'
import { useNavigate } from 'react-router-dom'

function AddPet() {
  const {state, getAccessToken} = useAuthContext();
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name:'',
    species:'',
    breed:'',
    age:'',
    status:'Available'
  })

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async ()=>{
    try{
        const token = await getAccessToken();
        console.log("Using token:", token); 
        const result = await createPet(formData, token)

        if (result.id){
            setMessage('Pet added Successfully!')
            setTimeout(()=>navigate('/manage-listings'),1500)
        } else{
            setMessage(result.message ||"Failed to Add Pet")
        }
    } catch (error){
        console.error("Full Error Object:", error);
        setMessage(error.response?.data?.message || 'Something Went Wrong')
    }
  }
  return (
    <div>
        <h2> Add new Pet</h2>
        <input name='name' placeholder='Pet Name' onChange={handleChange} />
        <input name='species' placeholder='Species' onChange={handleChange} />
        <input name='breed' placeholder='Breed' onChange={handleChange} />
        <input name='age' placeholder='Age' onChange={handleChange} />
        <select name='status' onChange={handleChange} >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Adopted">Adopted</option>
        </select>
        <button onClick={handleSubmit}>Add Pet</button>
        {message && <p> {message}</p>}
    </div>
  )
}

export default AddPet