import { useContext, useEffect, useState } from "react";
import { axiosConcertApi } from "../axios/axiosConcertApi";
import { useParams } from "react-router";
import SeatsModal from "../components/SeatsModal";
import { BsTagsFill } from "react-icons/bs";
import { parseISO, format } from "date-fns";
import { MdDateRange } from "react-icons/md";
import en from "date-fns/locale/en-US";
import { SiteContext } from "../context/SiteContext";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import CardSliderM from "../components/CardSlider";
import { axiosUserApi } from "../axios/axiosUserApi";
import { ToastContainer } from "react-toastify";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import LazyLoadImage from "../components/LazyLoadImage";
import { formatPrice } from "../components/Functions";
import { CiHeart } from "react-icons/ci";
import { dateFormat } from "../components/Functions";
import { Helmet } from "react-helmet";
export default function ConcertDetailed() {
  const params = useParams();
  const [concertData, setConcertData] = useState(null);
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    setIsOpenModal,
    isAvailableSelectedSeat,
    selectedSeats,
    setSelectedSeats,
    setCartList,
    showSuccessToast,
    setFavList,
    isValid,
  } = useContext(SiteContext);

  const [selectedConcertInfo, setSelectedConcertInfo] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosConcertApi(`/api/activity/${params.id}`);
        const responseData = await response.data;
        setConcertData(responseData.activity);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };
    getData();
  }, [params.id]);

  useEffect(() => {
    const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    if (storedOnlineUser) {
      setIsFavorite(
        storedOnlineUser.favorites?.some((fav) => fav._id === concertData?._id)
      );
    }
  }, [concertData?._id]);

  const handleAddFavorites = async (item) => {
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
      console.error("Favorite update error:", error.message);
    }
  };

  const handleAddCart = async (item) => {
    setSelectedSeats(selectedSeats);

    const updatedConcertInfo = {
      item,
      selectedSeats,
    };
    setSelectedConcertInfo(updatedConcertInfo);

    const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    let newCartList = [...storedOnlineUser?.cart, updatedConcertInfo];

    await setCartList(newCartList);
    const updatedUser = {
      ...storedOnlineUser,
      cart: newCartList,
    };

    try {
      localStorage.setItem("onlineUser", JSON.stringify(updatedUser));
      await axiosUserApi.put(`/users/${updatedUser.id}`, { ...updatedUser });
      setCartList(updatedUser?.cart);
      showSuccessToast("Added to Cart");
    } catch (error) {
      console.error("Favorite update error:", error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Activity Detail</title>
        <meta name="description" content="activity-detail" />
      </Helmet>
      <div className="flex items-center justify-center mt-24">
        <div
          className="w-[85vw] md:w-[90vw]  flex flex-col md:flex-row items-center md:items-start 
      justify-center m-8 md:m-5 p-4 md:p-8 space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="">
            <LazyLoadImage
              className="w-96 h-80 border border-gray-200 rounded-lg shadow-xl"
              src={concertData?.image[0]?.photo}
              alt={concertData?.title}
              title={concertData?.title}
            />
            <div className="mt-5 pl-2 md:pl-0">
              <p className="flex  items-center  text-sm text-blue-600 ">
                <FaMapMarkerAlt />{" "}
                <span className="">
                  {concertData?.locationName} / {concertData?.city}
                </span>
              </p>
              <iframe
                src={concertData?.locationMap}
                className="mt-1"
                width="375"
                height="350"
                style={{
                  border: "0",
                  borderRadius: "8px",
                  boxShadow: "1px 1px 5px #888",
                }}
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          <div className="w-[100%] md:w-[75%]   flex flex-col  md:pl-8 p-4  shadow-lg drop-shadow-sm  bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className=" w-[50%] flex items-center  justify-start space-x-2 md:space-x-4 ">
                <FacebookShareButton
                  description={concertData?.description}
                  url={concertData?.image[0].photo}
                  hashtag={`#${concertData?.artist}`}
                >
                  <FacebookIcon size={28} round />
                </FacebookShareButton>
                <LinkedinShareButton
                  title={concertData?.title}
                  summary={concertData?.description}
                  url={concertData?.image[0].photo}
                  source={window.location.href}
                >
                  <LinkedinIcon size={28} round />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={concertData?.image[0].photo}
                  title={concertData?.title}
                >
                  <WhatsappIcon size={28} round />
                </WhatsappShareButton>
              </div>
              <button
                onClick={() => handleAddFavorites(concertData)}
                className="text-2xl m-1 md:m-3 flex items-center "
              >
                {isFavorite ? (
                  <FaHeart className="text-red-600" />
                ) : (
                  <CiHeart />
                )}
              </button>
            </div>

            <div className="flex items-center flex-col  md:flex-row justify-between">
              <h1 className="font-bold capitalize mt-5 md:mt-0 text-2xl">
                {concertData?.title}
              </h1>

              <div className="flex items-center mt-3 md:mt-0">
                <MdDateRange size={20} className="text-red-700" />
                <span className="text-sm font-bold">
                  {concertData?.date && dateFormat(concertData.date)} /{" "}
                  {concertData?.hour}
                </span>
              </div>
            </div>
            <h3 className=" text-2xl md:text-lg font-semibold mt-2 md:mt-0">
              {formatPrice(concertData?.ticketPrice)}
            </h3>
            <p className="font-semibold text-md flex items-center">
              <FaMapMarkerAlt className="text-blue-600" />
              <span className="pl-2 flex flex-wrap">
                {concertData?.locationName} / {concertData?.city}
              </span>
            </p>

            <p className="flex items-center">
              <BsTagsFill className="text-red-700" />{" "}
              <span className="text-gray-600 text-sm capitalize pl-2 font-semibold">
                {concertData?.category}
              </span>
            </p>

            <div className="bg-gray-200 p-4 rounded-md mt-5">
              <span className="font-bold italic text-sm">Activity Detail;</span>
              <p className="indent-2">
                {show
                  ? concertData?.description
                  : `${concertData?.description.substring(0, 200)}...`}
              </p>
              <button
                className="text-red-700 capitalize "
                onClick={() => setShow(!show)}
              >
                {show ? "show less" : "read more"}
              </button>
            </div>

            {concertData?.players?.length > 1 && (
              <div className="bg-gray-200 p-4 rounded-md mt-5">
                <h2 className="font-bold italic">Artists;</h2>
                <ul className="flex flex-wrap  items-center justify-center">
                  {concertData?.players?.map((player) => (
                    <li
                      key={player._id}
                      className=" flex flex-col items-center justify-center p-4"
                    >
                      <img
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full   "
                        src={player?.personImage}
                        alt={player?.name}
                      />
                      <p className="text-sm  font-semibold  flex flex-wrap">
                        {player?.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {concertData?.image?.length > 1 && (
              <div className="w-96 mx-auto ">
                <CardSliderM image={concertData?.image} />
              </div>
            )}

            <div
              className="text-end font-medium p-4 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              {isAvailableSelectedSeat && "Selected seats:"}
              {isAvailableSelectedSeat &&
                selectedSeats?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-800 text-xs font-medium mx-0.5 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                  >{`${item.rowIndex}-${item.columnIndex} |`}</span>
                ))}
            </div>

            <div className="flex item-center justify-end space-x-2 mt-3">
              <button
                onClick={() => handleAddCart(concertData)}
                className={`px-3 flex py-2 rounded-lg bg-red-700 text-gray-50 ${
                  isAvailableSelectedSeat ? "opacity-100" : "opacity-50"
                } `}
                disabled={!isAvailableSelectedSeat}
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
              </button>
              <button
                onClick={() => setIsOpenModal((prev) => !prev)}
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className={`block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  isValid ? "opacity-100" : "opacity-50"
                }`}
                type="button"
                disabled={!isValid}
              >
                Select Arm Chair
              </button>
            </div>
          </div>
          <SeatsModal />
          <ToastContainer
            autoClose={750}
            pauseOnFocusLoss={true}
            pauseOnHover={false}
            theme="colored"
          />
        </div>
      </div>
    </>
  );
}
