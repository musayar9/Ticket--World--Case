import { useContext, useEffect } from "react"
import { SiteContext } from "../context/SiteContext"
import { ToastContainer } from "react-toastify";
import Card from "../components/Card";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import SeatsModal from "../components/SeatsModal";

export default function Home() {
    const [concertData] = useActivitiesAxiosApi()
    
    const { showSuccessToast, isLogin, setIsLogin } = useContext(SiteContext)

    useEffect(() => {
        if (isLogin) {
            showSuccessToast("Login success")
            setIsLogin(false)
        }
    }, [])

    return (
        <>
            <div className="border border-solid border-red-800 flex w-[97%] flex-wrap m-auto">
                {
                    concertData.map((item, index) => <Card key={index} item = {item}/> )
                }
            </div>
            <ToastContainer />
        </>

    )
}