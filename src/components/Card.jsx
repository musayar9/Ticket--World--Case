import { Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { axiosUserApi } from "../axios/axiosUserApi";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import { dateFormat, formatPrice } from "./Functions";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function Card({ item }) {
  const { favList, setFavList } = useContext(SiteContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    if (storedOnlineUser) {
      setIsFavorite(
        storedOnlineUser.favorites?.some((fav) => fav._id === item._id)
      );
    }
  }, [item._id]);

  const handleAddFavorites = async () => {
    let newFavorites;

    const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    if (storedOnlineUser?.favorites?.some((fav) => fav._id === item._id)) {
      newFavorites = storedOnlineUser.favorites.filter(
        (fav) => fav._id !== item._id
      );
    } else {
      newFavorites = [...storedOnlineUser?.favorites, item];
    }
    setFavList(newFavorites);
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
    <div
      className="max-w-md  w-[420px] md:w-[280px] h-[70vh]  m-3.5 flex flex-col  justify-between  border
    border-gray-200 rounded-lg shadow bg-[#010A3B]"
    >
      <Link to={`/concert/${item._id}`}>
        <div className=" w-full md:w-[280px] h-[180px] overflow-hidden">
          <img
            className="rounded-t-lg object-fill w-full lg:w-[350px]   h-[100%]"
            src={
              item?.image[0]?.photo === ""
                ? "https://via.placeholder.com/600x400"
                : item?.image[0]?.photo
            }
            alt={item?.title}
            title={item?.title}
          />
        </div>
      </Link>
      <button
        onClick={() => handleAddFavorites(item)}
        className="text-white ml-auto text-lg mx-2 mt-2 "
      >
        {isFavorite ? <BsFillBookmarkFill /> : <BsBookmark />}
      </button>
      <div className="p-5 flex flex-col justify-between">
        <a href="#">
          <h5 className="mb-2 text-lg font-bold tracking-tight truncate text-gray-900 dark:text-white">
            {item.title}
          </h5>
        </a>

        <p className="font-normal flex items-center  text-gray-700 dark:text-gray-400">
          <FaMapMarkerAlt />{" "}
          <span className="pl-2 truncate">{`${item?.locationName}`}</span>
        </p>
        <p className="font-normal flex items-center  text-gray-700 dark:text-gray-400">
          <BsCalendar2DateFill className="" />
          <span className="pl-1 text-md">{`${dateFormat(item.date)} | ${
            item.hour
          }`}</span>
        </p>

        <p
          className="font-normal text-lg pt-1 text-gray-50  flex items-center 
        "
        >{`${formatPrice(item.ticketPrice)} `}</p>
      </div>

      <button
        onClick={() => setShowAlert((prev) => !prev)}
        className={`m-2  p-2 px-3 flex py-2 rounded-lg bg-red-700 text-gray-50 hover:bg-red-800 hover:text-white-700`}
      >
        <svg
          className="w-5 h-5 text-gray-800 dark:text-white mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
          />
        </svg>
        Add Cart
        {showAlert ? (
          <div
            className="ml-5 text-[14px] text-white-500 rounded-lg"
            role="alert"
          >
            <span className="font-light ">Choose the seat first!</span>
          </div>
        ) : null}
      </button>
    </div>
  );
}
