import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import ProfileField from "../components/ProfileField";
import "../styles/profile.css"

function Profile() {
    const {userInfo, userRole} = useUser()

    if (!userInfo) return <p> Loading...</p>

    return (
        <div className="profile-container">
            <div className="profile-avatar">{userInfo?.name?.givenName?.[0]}</div>
            <h2 className="profile-title">My Profile</h2>
            <span className="profile-role">{userRole}</span>
            <div className="profile-info">
                <ProfileField label="First Name" value={userInfo?.name?.givenName}/>
                <ProfileField label="Family Name" value={userInfo?.name?.familyName}/>
                <ProfileField label="Email" value={userInfo?.emails?.[0]}/>
                <ProfileField label="Phone" value={userInfo.phoneNumbers?.[0]?.value}/>
                <ProfileField label="Birth Date" value= {userInfo?.["urn:scim:wso2:schema"]?.dateOfBirth}/>
                <ProfileField label="Country" value= {userInfo?.["urn:scim:wso2:schema"]?.country}/>
                <ProfileField label="Username" value= {userInfo?.userName}/>
            </div>
        </div>
    )
}

export default Profile
