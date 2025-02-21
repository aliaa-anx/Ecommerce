import React from 'react'
import{Navigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
export default function ProtectedRoutes({children}) {
     const {authToken} = useContext(AuthContext);

    if(!authToken){
        return <Navigate to="/login" />;
    }
  return children;
    
}
