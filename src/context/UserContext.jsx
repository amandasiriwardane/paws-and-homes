import { createContext,useContext, useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext()

export function UserProvider({children}){
    const {state, getBasicUserInfo , httpRequest } = useAuthContext()
    const [ userInfo, setUserInfo ] =useState(null)
    const [userRole, setUserRole]=useState(null)

    const fetchUser =() =>{
        if (state.isAuthenticated){
            httpRequest({
                url:"https://api.eu.asgardeo.io/t/orgama/scim2/Me",
                method: "GET",
                headers: {"Content-Type":"application/json"}
            }).then((response)=>{
                {/*console.log("SCIM data",response.data)
                console.log("Roles data",response.data?.roles)*/}
                setUserInfo(response.data)
                const appRole = response.data?.roles?.find(
                    role => role.audienceType==="application"
                )
                setUserRole(appRole?.display)
            })
        
        }
    }
    useEffect(()=>{
        fetchUser()
    }, [state.isAuthenticated])

    return (
        <UserContext.Provider value ={{userInfo, userRole, refreshUser: fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}