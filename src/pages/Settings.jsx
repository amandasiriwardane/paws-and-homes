import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useUser } from "../context/UserContext";

function Settings(){
    const {userInfo, refreshUser}= useUser()
    const {httpRequest} =useAuthContext()
    const [formData, setFormData] =useState({
        givenName: userInfo?.givenName || "",
        phoneNumber : userInfo?.phoneNumber ||"",   
    })

    const [message, setMessage] =useState("")
    useEffect(()=>{
        if (userInfo){
            setFormData({
                givenName: userInfo?.name?.givenName || "",
                phoneNumber : userInfo?.phoneNumbers?.[0]?.value ||"",
            })
        }
    }, [userInfo])

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSave = async()=>{
        try {
            const response = await httpRequest({
                url: "https://api.eu.asgardeo.io/t/orgama/scim2/Me",
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                data: {
                    "schemas": [
                        "urn:ietf:params:scim:api:messages:2.0:PatchOp"
                    ],
                    "Operations": [
                        {
                        "op": "replace",
                        "value": {
                            name: {givenName: formData.givenName},
                            phoneNumbers:[
                                {value: formData.phoneNumber, type: "mobile"}
                            ]
                        }
                        }
                    ]
                }
            })
            setTimeout(()=>{
                refreshUser()
            },1000)
            console.log("Success:", response.data)
            setMessage("Profile updated successfully!")
        } catch(error){
            setMessage("Update Failed!")
            console.error("SCIM Error:", error?.response?.data || error)
        }
    }

    return (
        <div>
            <h2>Settings</h2>
            <div>
                <label>First Name:</label>
                <input 
                name="givenName"
                value={formData.givenName}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Save Changes</button>
            {message && <p>{message}</p>}

        </div>
    )
}

export default Settings