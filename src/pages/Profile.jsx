import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";

function Profile() {
    const {userInfo} = useUser()

    return (
        <div>
            <h2>My Profile</h2>
            {userInfo? (
                <>
                <p> Name: {userInfo.displayName}</p>
                <p>Email : {userInfo.email}</p>
                <p>Username : {userInfo.username}</p>
                <p>Birth date: {userInfo.birthdate}</p>
                <p>Phone: {userInfo.phoneNumber}</p>
                <p>Address: {userInfo.address.country}</p>
                </>
            ): (
                <p>Loading .....</p>
            )}
        </div>
    )
}

export default Profile
