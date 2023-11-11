import { Link } from "react-router-dom"
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { axiosUserApi } from "../axios/axiosUserApi";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";

export default function Card({ item }) {
    const {favList, setFavList} = useContext(SiteContext)
    const [isFavorite, setIsFavorite] = useState(false);

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
        <div className="max-w-sm w-[280px] h-[75vh] m-3.5 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

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
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.description.substring(0, 40)}...`}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.locationName.substring(0, 30)}...`}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.date} | ${item.hour}`}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{`${item.ticketPrice} TL`}</p>
            </div>
        </div>

    )
}