import React, { useEffect, useContext, useState } from "react";
import { FaTheaterMasks, FaLaughBeam, FaIcons } from "react-icons/fa";
import { MdOutlineFestival } from "react-icons/md";
import { PiConfettiBold } from "react-icons/pi";
import { SiteContext } from "../context/SiteContext";

const CategoriesButton = () => {
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    concertData,
    filteredToCategories,
    setFilteredToCategories,
    isCategory,
    setIsCategory,
    showPastEvents,
    setShowPastEvents,
    head,
    setHead,
  } = useContext(SiteContext);

  useEffect(() => {
    const categories = ["all", ...new Set(concertData?.map((v) => v.category))];
    console.log(categories);
    setUniqueCategory(categories);
  }, [setUniqueCategory, concertData]);

  const handleFilter = async (category) => {
    setIsCategory(true);
    if (isCategory) {
      setFilteredToCategories(concertData);
      setSelectedCategory("all");
    }
    await setSelectedCategory(category);

    if (category === "all") {
      await setFilteredToCategories(concertData);
      setHead(`Filter results by ${category}`);
      return;
    }
    setHead(`Filter results by ${category}`);
    const filterValue = concertData.filter((c) => c.category === category);

    await setFilteredToCategories(filterValue);
    setShowPastEvents(false);
  };

  const handleCheckboxChange = async () => {
    setIsCategory(false);

    if (isCategory) {
      setShowPastEvents(false);
    }
    setShowPastEvents(!showPastEvents);

    if (!showPastEvents) {
      const filteredCards = concertData?.filter(
        (d) => new Date(d.date) <= new Date()
      );
      setFilteredToCategories(filteredCards);
      setHead(`Filter results by past events`);
    } else {
      setFilteredToCategories(concertData);
      setHead(`Filter results by All`);
    }
  };
  console.log(filteredToCategories);

  const getIconsCategory = (categoryName) => {
    switch (categoryName) {
      case "theatre":
        return <FaTheaterMasks />;
      case "stand-up":
        return <FaLaughBeam />;
      case "concerts":
        return <FaIcons />;
      case "festivals":
        return <MdOutlineFestival />;
      case "all":
        return <PiConfettiBold />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   xl:flex  items-center justify-center  text-center  md:gap-x-2 gap-y-2 p-4 text-white  lg:gap-y-1 xl:gap-y-0 ">
          {uniqueCategory?.map((category, index) => (
            <button
              key={index}
              className={`flex items-center justify-center   w-44 px-4 py-2 rounded-md focus:z-10   ease-in duration-300    ${
                isCategory && selectedCategory === category
                  ? "bg-blue-900 text-gray-50"
                  : "bg-[#010A3B]"
              } `}
              onClick={() => handleFilter(category)}
            >
              <span className="text-xl p-2 ">{getIconsCategory(category)}</span>
              <h4 className="h-full flex items-center justify-center capitalize">
                {category}
              </h4>
            </button>
          ))}
          <div
            className={`flex w-44 items-center justify-center px-2 py-2  rounded-md ${
              showPastEvents ? "bg-blue-900 text-gray-50" : "bg-[#010A3B]"
            }`}
          >
            <input
              className=""
              type="checkbox"
              id="checkbox"
              checked={showPastEvents}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className="p-2 text-md text-gray-50">
              Past Events
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesButton;
