import { createContext,useContext, useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext()

export function UserProvider({children}){
    const {state, getBasicUserInfo , httpRequest, getDecodedIDToken } = useAuthContext()
    const [ userInfo, setUserInfo ] =useState(null)
    const [userRole, setUserRole]=useState(null)
    const [needsRoleAssignment,setNeedsRoleAssignment]= useState(false)

    const fetchUser =() =>{
        if (state.isAuthenticated){

            //role from jwt
            getDecodedIDToken().then((token)=>{
                //console.log("decoded token",token)
                const roleFromToken = token?.roles
                //console.log("roles from token", roleFromToken)

                if (roleFromToken){
                    setUserRole(Array.isArray(roleFromToken)
                    ? roleFromToken[0]
                    : roleFromToken
                    )
                    setNeedsRoleAssignment(false)
                }
                else{
                    setUserRole(null)
                    setNeedsRoleAssignment(true)
                }
            })
            httpRequest({
                url:"https://api.eu.asgardeo.io/t/orgama/scim2/Me",
                method: "GET",
                headers: {"Content-Type":"application/json"}
            }).then((response)=>{
                //console.log("SCIM data",response.data)
                //console.log("Roles data",response.data?.roles)
                //console.log("SCIM USER ID:", response.data.id)
                //console.log("Custome schema", response.data?.["urn:scim:wso2:schema"])
                setUserInfo(response.data)
                const customRole =
                    response.data?.["urn:scim:schemas:extension:custom:User"]?.userRole;
                //console.log("customRole", customRole);
               
            })
        
        }
    }
    useEffect(()=>{
        fetchUser()
    }, [state.isAuthenticated])

    return (
        <UserContext.Provider value ={{userInfo, userRole, refreshUser: fetchUser, needsRoleAssignment}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}