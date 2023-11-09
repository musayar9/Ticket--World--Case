import { useContext, useEffect } from "react"
import { SiteContext } from "../context/SiteContext"
import { ToastContainer } from "react-toastify";
import CardSlider from "../components/CardSlider";

export default function Home() {
    const { showSuccessToast, isLogin, setIsLogin } = useContext(SiteContext)

    useEffect(() => {
        if (isLogin) {
            showSuccessToast("Login success")
            setIsLogin(false)
        }
    }, [])

    return (
        <>
            <h1>Home</h1>
            <ToastContainer />
            <CardSlider/>
        </>

    )
}