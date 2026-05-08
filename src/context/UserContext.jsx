import { createContext,useContext, useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext()

export function UserProvider({children}){
    const {state, getBasicUserInfo , httpRequest } = useAuthContext()
    const [ userInfo, setUserInfo ] =useState(null)

    const fetchUser =() =>{
        if (state.isAuthenticated){
            httpRequest({
                url:"https://api.eu.asgardeo.io/t/orgama/scim2/Me",
                method: "GET",
                headers: {"Content-Type":"application/json"}
            }).then((response)=>{
                setUserInfo(response.data)
            })
        
        }
    }
    useEffect(()=>{
        fetchUser()
    }, [state.isAuthenticated])

    return (
        <UserContext.Provider value ={{userInfo, refreshUser: fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}