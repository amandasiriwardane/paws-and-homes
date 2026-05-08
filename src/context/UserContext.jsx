import { createContext,useContext, useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext()

export function UserProvider({children}){
    const {state, getBasicUserInfo } = useAuthContext()
    const [ userInfo, setUserInfo ] =useState(null)

    const fetchUser =() =>{
        if (state.isAuthenticated){
        getBasicUserInfo().then((info) => {
            setUserInfo(info)
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