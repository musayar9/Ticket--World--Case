import ChairIcon from "@mui/icons-material/Chair";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";

export default function SeatsModal() {
  const { isOpenModal, setIsOpenModal, isAvailableSelectedSeat, setIsAvailableSelectedSeat, selectedSeats, setSelectedSeats } = useContext(SiteContext)

 

  const handleChangeSeat = (rowIndex, columnIndex) => {
    const newSelectedSeat = {
      rowIndex,
      columnIndex,
    };
    setSelectedSeats((prev) => {
      if (prev.some((seat) => seat.rowIndex === rowIndex && seat.columnIndex === columnIndex)) {
        return prev.filter((seat) => !(seat.rowIndex === rowIndex && seat.columnIndex === columnIndex));
      } else {
        return [...prev, newSelectedSeat];
      }
    });
  };

  useEffect(() => {
    const storedSelectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (storedSelectedSeats) {
      setSelectedSeats(storedSelectedSeats);
    }
    setIsAvailableSelectedSeat(localStorage.getItem("selectedSeats") ? true : false)
  }, []);

  const handleSelectSeat = (e) => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    setIsOpenModal(false)

    const storedSelectedSeats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");

    if (storedSelectedSeats.length === 0) {
      localStorage.removeItem("selectedSeats");
      setIsAvailableSelectedSeat(false);
    } else {
      setIsAvailableSelectedSeat(true);
    }
    // setSelectedSeats(selectedSeats)
    
  }

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`flex items-center justify-center fixed top-0 left-0 right-0 z-50  ${isOpenModal ? `block` : `hidden`}  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg text-gray-900 dark:text-white">
                Please, select your seat..
              </h3>
              <button
                onClick={() => setIsOpenModal(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="px-8 text-center">
              <div className="bg-gray-600 m-5 p-8  text-white text-lg">
                SAHNE
              </div>
              {
                <div className="row">
                  {[...new Array(21)].map((column, columnIndex) => (
                    <span key={columnIndex}>
                      <ChairIcon className="text-gray-800" key={columnIndex} />
                    </span>
                  ))}
                </div>
              }
              {[...new Array(7)].map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {[...new Array(21)].map((column, columnIndex) => (
                    <span key={columnIndex} onClick={(e) => handleChangeSeat(rowIndex + 2, columnIndex + 1)}>
                      <ChairIcon className={`${selectedSeats?.some((seat) => seat.rowIndex === rowIndex + 2 && seat.columnIndex === columnIndex + 1)
                        ? "text-green-800 "
                        : "text-red-800"
                        } cursor-pointer hover:text-green-800`}
                        key={columnIndex}
                        id="1"
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="mr-3 mt-5">
                <span>
                  <ChairIcon className="text-gray-800" /> Dolu
                </span>
              </div>
              <div className="mr-3 mt-5">
                <span>
                  <ChairIcon className="text-red-800" /> Boş
                </span>
              </div>
              <div className="mr-3 mt-5">
                <span>
                  <ChairIcon className="text-green-800" /> Seçilmiş
                </span>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleSelectSeat}
                data-modal-hide="default-modal"
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
