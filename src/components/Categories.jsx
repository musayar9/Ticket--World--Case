import React, { useEffect, useState } from "react";
import axiosConcertApi from "../axios/axiosConcertApi";
import {FaTheaterMasks, FaLaughBeam} from "react-icons/fa";
import {MdOutlineFestival} from "react-icons/md";
import {PiConfettiBold} from "react-icons/pi";


function Categories() {

  const [uniqueCategory, setUniqueCategory] = useState(["all"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConcertApi.get("");
        console.log("response", response);

        const data = response.data.activity;
        console.log(data);

        const categories = ["all", ...new Set(data.map((i) => i.category))];
        console.log(categories);
        setUniqueCategory(categories);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  const getIconsCategory=(categoryName)=>{
    switch (categoryName) {
        case "theatre":
          return <FaTheaterMasks/>;
        case "stand-up":
          return <FaLaughBeam/>;
        case "concerts":
            return <FaLaughBeam/>;
        case "festivals":
            return <MdOutlineFestival />;
        case "all":
            return <PiConfettiBold/>;
        default:
          return null;
  }
};

  return (
    <>
      <div className="flex items-center justify-center mt-3">
        <div className="lg:flex text-center inline-block md:gap-x-2 text-white"> {/*lg or md */}
          {uniqueCategory.map((category, index) => (
            <button
              key={index}
              className="flex items-center p-0.5 px-12 py-2 mb-2 mr-2 m-3 overflow-hidden text-base font-bold rounded-lg bg-gradient-to-r from-teal-200 to-lime-300 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700">
                <span className="text-2xl p-2 text-white">{getIconsCategory(category)}</span>
                <h4 className="h-full flex items-center justify-center capitalize">{category}</h4>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
