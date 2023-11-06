import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";

export default function Header() {
    const { isValid, setIsValid, navigate } = useContext(SiteContext)

    const handleSignout = (e) => {
        localStorage.removeItem("onlineUser")
        setIsValid(false)
        navigate("/login")
    }

    return (
        <>
            <nav className="bg-white border-gray-200 ">
                <div className="flex flex-wrap justify-between items-center mx-auto p-4 ">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
                    </a>
                    <div className="flex items-center">
                        {
                            !isValid ? (<>
                                <NavLink to="/login" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Login /</NavLink>
                                <NavLink to="/signup" href="#" className="mr-6 text-sm text-blue-600 dark:text-blue-500 hover:underline ml-1">Sign up</NavLink>
                            </>) : <button onClick={handleSignout} to="/signup" href="#" className="mr-6 text-sm text-blue-600 dark:text-blue-500 hover:underline ml-1">Sign out</button>
                        }
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                            <li>
                                <NavLink to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</NavLink>
                            </li>

                            <li>
                                <NavLink to="/about" className="text-gray-900 dark:text-white hover:underline">About us</NavLink>
                            </li>
                            <li>
                                {
                                    isValid && <NavLink to="/favorites" className="text-gray-900 dark:text-white hover:underline">Favorites</NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}