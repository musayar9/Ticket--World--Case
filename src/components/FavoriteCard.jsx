import { Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import { axiosUserApi } from "../axios/axiosUserApi";

export default function FavoriteCard({ item }) {
    const { favList, setFavList, cartList, setCartList } = useContext(SiteContext);
    const [showAlert, setShowAlert] = useState(false)


    const handleRemoveFavorite = async (item) => {
        try {
            const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
            const updatedUser = {
                ...storedOnlineUser,
                favorites: storedOnlineUser.favorites.filter((fav) => fav._id !== item._id),
            };
            localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
            await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
            setFavList(updatedUser.favorites);
        } catch (error) {
            console.error("Favori kaldırma işlemi sırasında bir hata oluştu:", error);
        }
    };

    const handleAddCart = async (item) => {

        //! Burada sepete ekleme işlemi yapıldı. Burayı kullanacaksın!!
        // const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
        // let newCartList = [...storedOnlineUser.cart, item];

        // setCartList(newCartList)
        // const updatedUser = {
        //     ...storedOnlineUser,
        //     cart: newCartList,
        // };

        // try {
        //     localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
        //     await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
        //     // setIsFavorite(!isFavorite);
        // } catch (error) {
        //     console.error("Favori güncelleme hatası:", error.message);
        // }
        // ! Sepete ekleyince fav dan kaldırıyor
        // handleRemoveFavorite(item)
    }

    return (
        <>
            <div className="max-sm:w-[100%] max-md:w-[100%] max-lg:w-[85%] max-xl:w-[80%] max-2xl:w-[60%] max-md:h-[32vh] max-lg:h-[35vh] my-2 h-[25vh] flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/concert/${item._id}`}>
                    <div className="w-[190px] h-[100%] overflow-hidden">
                        <img className="rounded-t-lg object-fill w-[350px] h-[100%]" src={item.image[0].photo} alt="" />
                    </div>
                </Link>
                <div className="w-[100%] flex">
                    <div className="py-3 px-6 max-md:px-2 flex flex-col justify-between">
                        <a href="#">
                            <h5 className="max-md:text-[15px] text-lg font-bold tracking-tight text-gray-900 dark:text-white">{`${item.title.substring(0, 30)}...`}</h5>
                        </a>
                        <p className="max-md:text-[12px] text-sm text-gray-700 dark:text-gray-400">{`${item.description.substring(0, 50)}...`}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{`${item.date} | ${item.hour}`}</p>
                        <div className="w-[100%]">
                            <span className="w-[30%] bg-red-100 text-red-800 text-base font-medium me-2 px-2.5 py-0.5 my-2 rounded dark:bg-red-900 dark:text-red-300">{`${item.ticketPrice} TL`}</span>
                        </div>
                    </div>
                    <div className="max-md:w-[30%] w-[50%] max-md:w-[60%] max-sm:w-[100%] flex flex-col justify-between h-[100%]">
                        <button onClick={() => handleRemoveFavorite(item)} className="text-white ml-auto text-lg m-2" ><BsFillBookmarkFill /></button>
                        <div>
                            {showAlert ? <div className="text-end mr-2 text-[14px] text-white rounded-lg" role="alert">
                                <span className="font-light ">Choose the seat first!</span>
                            </div> : null}
                            <button onClick={() => setShowAlert(prev => !prev)} className={`m-2 p-2 px-3 float-right flex py-2 rounded-lg bg-red-700 text-gray-50 hover:bg-red-800 hover:text-white-700`}>
                                <svg className="w-5 h-5 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                                </svg>
                                Add Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}