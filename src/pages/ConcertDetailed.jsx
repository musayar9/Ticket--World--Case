import { useEffect, useState } from "react";
import { axiosConcertApi } from "../axios/axiosConcertApi";
import { useParams } from "react-router";
import SeatsModal from "../components/SeatsModal";
import { BsTagsFill } from "react-icons/bs";
import { parseISO, format } from "date-fns";
import { MdDateRange } from "react-icons/md";
import en from "date-fns/locale/en-US";
export default function ConcertDetailed() {
  const [concertData, setConcertData] = useState(null);

  const params = useParams();
  console.log(params);
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

  return (
    <>
      <div className="w-[90vw] flex items-start justify-center m-5 p-8 space-x-2">
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
        </div>
        <div className="w-[75%] flex flex-col pl-8 p-4  shadow-lg drop-shadow-sm border border-red-900 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between">
            <h1 className="font-bold capitalize text-2xl">
              {concertData?.title}
            </h1>

            <p className="font-bold flex items-center">
              <MdDateRange size={20} className="text-red-700" />
              <span className="text-sm">
                {" "}
                {concertData?.date && dateFormat(concertData.date)} /{" "}
                {concertData?.hour}
              </span>
            </p>
          </div>

          <p className="flex items-center">
            <BsTagsFill className="text-red-700" />{" "}
            <span className="text-gray-600 text-sm capitalize pl-2 font-semibold">
              {concertData?.category}
            </span>
          </p>

          <div>
            <span className="font-bold italic text-sm">Activity Detail;</span>
            <p>{concertData?.description}</p>
          </div>

          <div className="flex item-center justify-end space-x-2">
            <button className="px-3 py-2 rounded-lg bg-red-700 text-gray-50">
              {" "}
              Add Basket
            </button>
            <SeatsModal />
          </div>
        </div>
      </div>
    </>
  );
}
