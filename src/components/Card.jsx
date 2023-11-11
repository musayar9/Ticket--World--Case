import { Link } from "react-router-dom"
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { axiosUserApi } from "../axios/axiosUserApi";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";

export default function Card({ item }) {
    const { favList, setFavList } = useContext(SiteContext)
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
        if (storedOnlineUser) {
            setIsFavorite(
                storedOnlineUser.favorites.some((fav) => fav._id === item._id)
            );
        }
    }, [item._id]);

    const handleAddFavorites = async () => {
        let newFavorites;

        const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
        if (storedOnlineUser?.favorites.some((fav) => fav._id === item._id)) {
            newFavorites = storedOnlineUser.favorites.filter(
                (fav) => fav._id !== item._id
            );
        } else {
            newFavorites = [...storedOnlineUser.favorites, item];
        }
        setFavList(newFavorites)
        const updatedUser = {
            ...storedOnlineUser,
            favorites: newFavorites,
        };

        try {
            localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
            await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Favori güncelleme hatası:", error.message);
        }
    };

    return (
        <div className="max-w-sm w-[280px] h-[80vh] m-3.5 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <Link to={`/concert/${item._id}`}>
                <div className="w-[280px] h-[180px] overflow-hidden">
                    <img className="rounded-t-lg object-fill w-[350px] h-[100%]" src={item.image[0].photo} alt="" />
                </div>
            </Link>
            <button onClick={() => handleAddFavorites(item)} className="text-white ml-auto text-lg mx-2 mt-2" >{isFavorite ? <BsFillBookmarkFill /> : <BsBookmark />}</button>
            <div className="p-5 h-[55vh] flex flex-col justify-between">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                </a>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.description.substring(0, 40)}..`}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.locationName.substring(0, 30)}..`}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.date} | ${item.hour}`}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.ticketPrice} TL`}</p>
            </div>

            <button onClick={() => setShowAlert(prev => !prev)} type="button" className="m-2 p-2 flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                </svg>
                Add Cart
                {showAlert ? <div className="ml-5 text-[14px] text-red-500 rounded-lg" role="alert">
                    <span className="font-light ">Choose the seat first!</span>
                </div> : null}
            </button>


        </div>

    )
}