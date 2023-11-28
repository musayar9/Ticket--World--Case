import React, { useEffect, useContext, useState, memo } from "react";
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
    isSearch,
    setIsSearch,
  } = useContext(SiteContext);

  useEffect(() => {
    const categories = ["all", ...new Set(concertData?.map((v) => v.category))];
    setUniqueCategory(categories);
  }, [setUniqueCategory, concertData]);

  const handleFilter = async (category) => {
    setIsCategory(true);
    setIsSearch(false);
    if (isCategory) {
      setFilteredToCategories(concertData);
      setSelectedCategory("all");
    }
    await setSelectedCategory(category);

    if (category === "all") {
      await setFilteredToCategories(concertData);
      setShowPastEvents(false);

      return;
    }

    const filterValue = concertData.filter((c) => c.category === category);

    await setFilteredToCategories(filterValue);
    setShowPastEvents(false);
  };

  const handleCheckboxChange = async () => {
    setIsCategory(false);
    setIsSearch(false);
    if (isCategory) {
      setShowPastEvents(false);
    }
    setShowPastEvents(!showPastEvents);

    if (!showPastEvents) {
      const filteredCards = concertData?.filter(
        (d) => new Date(d.date) <= new Date()
      );
      setFilteredToCategories(filteredCards);
    } else {
      setFilteredToCategories(concertData);
    }
  };

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
      <div className="flex flex-col items-center justify-center mt-3 ">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  
        xl:flex  items-center justify-center  text-center  md:gap-x-2 gap-y-2 p-4
        text-white  lg:gap-y-1 xl:gap-y-0 "
        >
          {uniqueCategory?.map((category, index) => (
            <button
              key={index}
              className={`flex items-center justify-center  w-44 shadow-md
              shadow-gray-300   px-4 py-2 rounded-md hover:bg-[#888888]
              hover:text-gray-100 transition    ease-in duration-150    ${
                isCategory && selectedCategory === category
                  ? "bg-[#888888] text-gray-50"
                  : "bg-[#F5F5F5] text-gray-700"
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
            className={`flex w-44 items-center justify-center px-2 py-2 shadow-md shadow-gray-300 cursor-pointer rounded-md 
            hover:bg-[#888888]
              hover:text-gray-100 transition    ease-in duration-150   ${
                showPastEvents ? "bg-[#888888]" : "bg-[#F5F5F5] "
              }`}
          >
            <input
              className=""
              type="checkbox"
              id="checkbox"
              checked={showPastEvents}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="checkbox"
              className={`p-2 text-md text-gray-700 cursor-pointer hover:text-gray-100 ${
                showPastEvents ? "text-gray-100" : "text-gray-700"
              } `}
            >
              Past Events
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CategoriesButton);
