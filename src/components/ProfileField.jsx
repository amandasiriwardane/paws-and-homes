import React from 'react'

function ProfileField({label, value}) {
  return (
    <div className='profile-field'>
        <span className='field-label'>{label}</span>
        <span className='field-value'>{value}</span>
    </div>
  )
}

export default ProfileField