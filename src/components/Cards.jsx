import React, { useEffect, useState } from "react";
import axiosConcertApi from "../axios/axiosConcertApi";
import { FaTheaterMasks, FaLaughBeam, FaIcons } from "react-icons/fa";
import { MdOutlineFestival } from "react-icons/md";
import { PiConfettiBold, PiShoppingCartSimpleBold} from "react-icons/pi";

function Cards() {
  const [uniqueCategory, setUniqueCategory] = useState(["all"]);
  const [cardsData, setCardsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPastEvents, setShowPastEvents] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConcertApi.get("");
        const data = response.data.activity;
        const categories = ["all", ...new Set(data.map((i) => i.category))];
        setUniqueCategory(categories);
        const cards = data.map((item) => {
          return {
            image: item.image,
            title: item.title,
            location: item.location,
            date: item.date,
            ticketPrice: item.ticketPrice,
            category: item.category,
          };
        });
        setCardsData(cards);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCheckboxChange = () => {
    setShowPastEvents(!showPastEvents);
  };

  const filteredCards = selectedCategory === "all"
    ? cardsData.filter((card) => showPastEvents || new Date(card.date) >= new Date())
    : cardsData.filter(
        (card) =>
          (card.category === selectedCategory) &&
          (showPastEvents || new Date(card.date) >= new Date())
      );

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
      <div className="flex items-center justify-center mt-3">
        <div className="lg:flex text-center inline-block md:gap-x-2 text-white">
          {uniqueCategory.map((category, index) => (
            <button
              key={index}
              className={`flex items-center p-0.5 px-12 py-2 mb-2 mr-2 m-3 overflow-hidden text-base font-bold rounded-lg ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-teal-200 to-lime-300"
                  : "bg-gray-200"
              } hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="text-2xl p-2 text-white">
                {getIconsCategory(category)}
              </span>
              <h4 className="h-full flex items-center justify-center capitalize">
                {category}
              </h4>
            </button>
          ))}
        </div>
      </div>

      <div className="m-6 mx-14 flex items-center">
        <h2 className="mr-auto text-2xl font-bold ">Samsun Konser Etkinlikleri</h2>
        <div className="ml-auto">
          <input className=""
            type="checkbox"
            id="checkbox"
            checked={showPastEvents}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox" className="m-2 text-lg"> Tarihi Geçenler</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-14">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow
             dark:bg-gray-300 dark:border-lime-200 ${!showPastEvents && new Date(card.date) < new Date() ? "opacity-50" : ""
            }`}
          >
            <a href="#">
              <img className="rounded-t-lg" src={card.image} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {card.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.location}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-stone-600 bg-stone-300 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:bg-stone-100 dark:hover:bg-stone-200 dark:focus:ring-stone-300"
              >
                <PiShoppingCartSimpleBold/> {card.ticketPrice} 
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
