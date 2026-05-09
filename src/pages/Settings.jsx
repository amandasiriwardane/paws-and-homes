import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useUser } from "../context/UserContext";
import "../styles/settings.css"

function Settings(){
    const {userInfo,userRole, refreshUser}= useUser()
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
        <div className="settings-container">
            <h2 className="settings-title">Settings</h2>
            <div className="form-group">
                <label>First Name:</label>
                <input 
                name="givenName"
                value={formData.givenName}
                onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                />
            </div>
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
            {message && (<p className={message.includes("successfully")? "success-msg":"error-msg"}>{message}</p>)}

        </div>
    )
}

export default Settings