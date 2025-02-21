import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

 export default function AuthContextProvider({ children }) {
    const [authToken,setAuthToken] = useState(null);
    
         console.log("Auth Token Updated:", authToken);
//
useEffect(()=>{
    if(localStorage.getItem("authToken")){
        setAuthToken(localStorage.getItem("authToken"));
    }
},[])

    return (
        <AuthContext.Provider value={{ authToken,setAuthToken }}>
            {children}
        </AuthContext.Provider>
    )
}