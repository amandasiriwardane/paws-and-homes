import { createContext,useContext, useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext()

export function UserProvider({children}){
    const {state, getBasicUserInfo } = useAuthContext()
    const [ userInfo, setUserInfo ] =useState(null)

    useEffect(()=>{
        if (state.isAuthenticated){
        getBasicUserInfo().then((info) => {
            console.log(info)
            setUserInfo(info)
        })
        }
    }, [state.isAuthenticated])

    return (
        <UserContext.Provider value ={{userInfo}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}