import { useContext, useEffect, useState } from "react";
import { axiosConcertApi } from "../axios/axiosConcertApi";
import { useParams } from "react-router";
import SeatsModal from "../components/SeatsModal";
import { BsTagsFill } from "react-icons/bs";
import { parseISO, format } from "date-fns";
import { MdDateRange } from "react-icons/md";
import en from "date-fns/locale/en-US";
import { SiteContext } from "../context/SiteContext";

export default function ConcertDetailed() {
  const params = useParams();
  const [concertData, setConcertData] = useState(null);
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const {
    setIsOpenModal,
    isAvailableSelectedSeat,
    setIsAvailableSelectedSeat,
    selectedSeats,
    setSelectedSeats,
  } = useContext(SiteContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosConcertApi(`/activity/${params.id}`);
        const responseData = await response.data;
        setConcertData(responseData.activity);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };
    getData();
  }, [params.id]);

  const dateFormat = (dateValue) => {
    const parsedDate = parseISO(dateValue);
    const formattedDate = format(parsedDate, "d  MMMM  EEEE", {
      locale: en,
    });
    return formattedDate;
  };

  const handleAddCart = (item) => {
    // console.log(item)
  };

  return (
    <>
      <div className="w-[90vw] flex items-start justify-center m-5 p-8 space-x-4">
        <div className="">
          <img
            className="w-96 h-80 border border-gray-200 rounded-lg shadow-xl"
            src={
              concertData?.image[0]?.photo === ""
                ? "https://via.placeholder.com/600x400"
                : concertData?.image[0]?.photo
            }
            alt=""
          />
          <div>
            <>
              <iframe
                src={concertData?.locationMap}
                className="mt-5"
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
            </>
          </div>
        </div>

        <div></div>
        <div className="w-[75%]  flex flex-col pl-8 p-4  shadow-lg drop-shadow-sm border border-red-900 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between">
            <h1 className="font-bold capitalize text-2xl">
              {concertData?.title}
            </h1>

            <p className="font-bold flex items-center">
              <MdDateRange size={20} className="text-red-700" />
              <span className="text-sm">
                {concertData?.date && dateFormat(concertData.date)} /{" "}
                {concertData?.hour}
              </span>
            </p>
          </div>

          <p>{concertData?.locationName / concertData?.city}</p>

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

          {concertData?.players.length > 1 && (
            <div className="bg-gray-200 p-4 rounded-md mt-5">
              <h2 className="font-bold italic">Artists;</h2>
              <ul className="flex flex-wrap  items-start justify-start">
                {concertData?.players?.map((player) => (
                  <li
                    key={player._id}
                    className=" flex flex-col items-center justify-center p-4"
                  >
                    <img
                      className="w-24 h-24 rounded-full   "
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

          <div
            className="text-end font-medium p-4 text-sm text-red-800 rounded-lg"
            role="alert"
          >
            Selected seats:
            {isAvailableSelectedSeat &&
              selectedSeats?.map((item) => (
                <span className="bg-red-100 text-red-800 text-xs font-medium mx-0.5 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{`${item.rowIndex}-${item.columnIndex} |`}</span>
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
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Arm Chair
            </button>
          </div>
        </div>
        <SeatsModal />
      </div>
    </>
  );
}
