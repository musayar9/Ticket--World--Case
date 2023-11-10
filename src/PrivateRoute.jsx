import { useContext, useEffect } from "react";
import { SiteContext } from "./context/SiteContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { isValid, setIsValid } = useContext(SiteContext)
    
    if (!isValid) {
        return <Navigate to="/login" replace />
    }
    return children

}