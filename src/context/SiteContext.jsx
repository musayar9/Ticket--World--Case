import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SiteContext = createContext()

export default function SiteContextProvider({ children }) {
    const navigate = useNavigate()
    const showSuccessToast = (message) => toast.success(message);
    const showErrorToast = (message) => toast.error(message);

    const [isSignup, setIsSignup] = useState(false) // for toast message
    const [isLogin, setIsLogin] = useState(false) // for toast message
    const [isValid, setIsValid] = useState()

    useEffect(() => {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"))
        if (storedOnlineUser?.id) {
            // navigate("/");
            setIsValid(true);
        } else {
            // navigate("/login");
        }
    }, [])

    return (
        <SiteContext.Provider value={{ showSuccessToast, showErrorToast, navigate, isSignup, setIsSignup, isLogin, setIsLogin, isValid, setIsValid }}>
            {children}
        </SiteContext.Provider>
    )
}