import { useState, useEffect } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllPets, updatePet } from '../../api/petApi';

function EditPet() {
  const { id } = useParams();
  const { getAccessToken } = useAuthContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    status: 'Available'
  });

  // load existing pet data
  useEffect(() => {
    getAllPets().then(pets => {
      const pet = pets.find(p => p.id ==id);
      if (pet) setFormData(pet);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = await getAccessToken();
      await updatePet(id, formData, token);
      setMessage('Pet updated! ');
      setTimeout(() => navigate('/manage-listings'), 1500);
    } catch (error) {
      setMessage('Update failed');
    }
  };

  return (
    
    <div className='page-container'>
        <div className='pet-form'>
            <h2 className='page-title'> Edit Pet </h2>
            <div className='form-group'>
                <label>Pet Name</label>
                <input name='name' placeholder='Pet Name' value={formData.name} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label>Species</label>
                <input name='species' placeholder='Species'value={formData.species} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label>Breed</label>
                <input name='breed' placeholder='Breed' value={formData.breed} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label>Age</label>
                <input name='age' placeholder='Age'  value={formData.age} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label>Status</label>
                <select name='status' value={formData.status} onChange={handleChange} >
                    <option value="Available">Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Adopted">Adopted</option>
                </select>
            </div>
        
            
            <button  className='submit-btn' onClick={handleSubmit}>Update Pet</button>
            {message && <p className='success-msg'> {message}</p>}
        </div>
    </div>
  );
}

export default EditPet;



