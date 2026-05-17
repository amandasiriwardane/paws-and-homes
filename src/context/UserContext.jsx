import { createContext,useContext, useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext()

export function UserProvider({children}){
    const {state, getBasicUserInfo , httpRequest, getDecodedIDToken } = useAuthContext()
    const [ userInfo, setUserInfo ] =useState(null)
    const [userRole, setUserRole]=useState(null)
    const [needsRoleAssignment,setNeedsRoleAssignment]= useState(false)
    const [requestedRole, setRequestedRole]= useState(null)

    const fetchUser = async () => {

        if (!state.isAuthenticated) return;

        try {

            // 1. get JWT token
            const token = await getDecodedIDToken();

            console.log("decoded token", token);

            const roleFromToken = token?.roles;

            const normalizedRoles = Array.isArray(roleFromToken)
                ? roleFromToken
                : roleFromToken
                    ? [roleFromToken]
                    : [];

            console.log("normalizedRoles", normalizedRoles);

            // 2. get SCIM user
            const response = await httpRequest({
                url: "https://api.eu.asgardeo.io/t/orgama/scim2/Me",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("SCIM data", response.data);

            setUserInfo(response.data);

            const customRole =
                response.data?.["urn:scim:schemas:extension:custom:User"]?.userRole;

            console.log("customRole", customRole);

            const hasAssignedRole = normalizedRoles.length > 0;

            // CASE 1:
            // fully registered
            if (hasAssignedRole) {

                setUserRole(normalizedRoles[0]);
                setNeedsRoleAssignment(false);
                setRequestedRole(null);

            }

            // CASE 2:
            // custom role exists but JWT role not assigned yet
            else if (customRole) {

                setNeedsRoleAssignment(true);
                setRequestedRole(customRole);
                setUserRole(null);

            }

            // CASE 3:
            // brand new user
            else {

                setNeedsRoleAssignment(false);
                setRequestedRole(null);
                setUserRole(null);

            }

        } catch (err) {

            console.error("fetchUser error", err);

        }
    };
    useEffect(()=>{
        fetchUser()
    }, [state.isAuthenticated])

    return (
        <UserContext.Provider value ={{userInfo, userRole, refreshUser: fetchUser, needsRoleAssignment, requestedRole}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}


