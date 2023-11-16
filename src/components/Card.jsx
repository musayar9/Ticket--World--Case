import { Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { axiosUserApi } from "../axios/axiosUserApi";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import { dateFormat, formatPrice } from "./Functions";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import LazyLoadImage from "./LazyLoadImage";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
export default function Card({ item }) {
  const { setFavList } = useContext(SiteContext);
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
      className="max-w-md   w-[420px] md:w-[280px] h-[70vh]  m-3.5 flex flex-col justify-between border border-gray-200 rounded-lg
    shadow-md shadow-gray-300 bg-[#F5F5F5]"
    >
      <div className="relative">
        <Link to={`/concert/${item._id}`}>
          <div className=" w-full md:w-[280px] h-[180px] overflow-hidden group hover:rounded-t-lg flip-card-inner">
            <LazyLoadImage
              className="rounded-t-lg object-fill w-full lg:w-[350px] h-[100%] group-hover:scale-110  duration-500 ease-linear   group-hover:opacity-90 flip-cart-front"
              src={item?.image[0]?.photo}
              alt={item?.title}
              title={item?.title}
            />
          </div>
        </Link>
        <button
          onClick={() => handleAddFavorites(item)}
          className="text-gray-50 ml-auto transition duration-200 ease-in  border border-[#f5f5f5f5]  bg-transparent rounded-full w-10 h-10 p-2  text-2xl"
        >
          <FaHeart
            className={` transition duration-150 ease-in border  bg-transparent rounded-full w-10 h-10 p-2 absolute top-3 right-3 text-2xl hover:text-red-600 hover:border-red-600 ${
              isFavorite ? "text-red-600 border-red-600 " : " bg-transparent"
            }`}
          />

          {/* {isFavorite ? (
            <FaHeart className="  text-[#ff0000] " />
          ) : (
            <CiHeart className="" />
          )} */}
        </button>
      </div>

      <div className="p-5 flex flex-col justify-between">
        <a href="#">
          <h5 className="mb-2 text-lg font-bold tracking-tight truncate text-gray-900 ">
            {item.title}
          </h5>
        </a>

        <p className="font-normal flex items-center  text-gray-700 0">
          <FaMapMarkerAlt />{" "}
          <span className="pl-2 truncate">{`${item?.locationName}`}</span>
        </p>
        <p className="font-normal flex items-center  text-gray-700 ">
          <BsCalendar2DateFill className="" />
          <span className="pl-1 text-md">{`${dateFormat(item.date)} | ${
            item.hour
          }`}</span>
        </p>

        <p
          className="font-normal text-lg pt-1 text-gray-600  flex items-center 
        "
        >{`${formatPrice(item.ticketPrice)} `}</p>
      </div>

      <button
        onClick={() => {
          setShowAlert((prev) => !prev);
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);
        }}
        className={`m-2  p-2 px-3 flex py-2 rounded-lg bg-[#7a7a7a] text-gray-50 hover:bg-[#5f5f5f] duration-150 transition ease-in hover:text-white-700`}
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
