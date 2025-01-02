"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserSessionTyp } from "../types";
import { getUserSession } from "../actions/authenticating";
interface SessionIntrfc {
    user: UserSessionTyp;
    updateUser: ()=>Promise<void>;
}
type SessionType = SessionIntrfc | null;
const SessionContext = createContext<SessionType>(null);
export const UserSessionProvider = ({children}:{children: React.ReactNode;})=>{
    const [user, setUser] = useState<UserSessionTyp>(null);
    useEffect(()=>{
        updateUser();
    }, []);
    const updateUser = async ()=>{
        try{
            const response = await getUserSession();
            if(response.isAuthenticated && response.status===200 && response.data){
                setUser(response.data);
            }
            console.log("user not loggedIn");
        }catch{
            console.log("error ocucrs");
        }
    }
    return (
        <SessionContext.Provider value={{user, updateUser}}>
            {children}
        </SessionContext.Provider>
    )
}
export const useUserSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useUserSession must be used within a UserSessionProvider");
    }
    return context;
};
