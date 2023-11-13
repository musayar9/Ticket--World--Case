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
        <div className="lg:flex text-center inline-block md:gap-x-2 text-white">
          {uniqueCategory?.map((category, index) => (
            <button
              key={index}
              className={`flex items-center justify-center  w-44 px-4 py-2 rounded-md focus:z-10   ease-in duration-300    ${
                isCategory && selectedCategory === category
                  ? "bg-blue-900 text-gray-50"
                  : "bg-[#010A3B]"
              } `}
              onClick={() => handleFilter(category)}
            >
              <span className="text-2xl p-2 ">
                {getIconsCategory(category)}
              </span>
              <h4 className="h-full flex items-center justify-center capitalize">
                {category}
              </h4>
            </button>
          ))}
        </div>
        <div className="ml-auto px-4 py-2 mr-3 bg-[#010A3B] rounded-md">
          <input
            className=""
            type="checkbox"
            id="checkbox"
            checked={showPastEvents}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox" className="m-2 text-lg text-gray-50">
            Past Events
          </label>
        </div>
      </div>
    </>
  );
};

export default CategoriesButton;
