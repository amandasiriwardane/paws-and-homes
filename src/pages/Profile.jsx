import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";

function Profile() {
    const {userInfo} = useUser()

    return (
        <div>
            <h2>My Profile</h2>
            {userInfo? (
                <>
                <p> Name: {userInfo?.name?.givenName}</p>
                <p> Family Name: {userInfo?.name?.familyName}</p>
                <p>Email : {userInfo?.emails?.[0]}</p>
                <p>Username : {userInfo?.userName}</p>
                <p>Country: {userInfo?.["urn:scim:wso2:schema"]?.country}</p>
                <p>Birth Date: {userInfo?.["urn:scim:wso2:schema"]?.dateOfBirth}</p>
                <p>Phone: {userInfo.phoneNumbers?.[0]?.value}</p>
                </>
            ): (
                <p>Loading .....</p>
            )}
        </div>
    )
}

export default Profile
