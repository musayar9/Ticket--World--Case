import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { SiteContext } from "../context/SiteContext";

const SelectInput = () => {
  const [city, setCity] = useState([]);

  const [newValue, setNewValue] = useState("");
  const {
    isValid,
    setSidebar,
    concertData,
    filteredToCategories,
    setFilteredToCategories,
    setIsCategory,
    setShowPastEvents,
    setHead,
    isSearch,
    setIsSearch,
  } = useContext(SiteContext);

  useEffect(() => {
    const fetchCity = async () => {
      const res = await axios.get("http://ticket-verse.azurewebsites.net/api/city");
      const data = await res.data.city;
      setCity(data);
    };

    fetchCity();
  }, []);

  const handleCity = async (e) => {
    setNewValue(e.target.value);
    const filterCity = await concertData.filter(
      (v) => v.city === e.target.value
    );
    setIsSearch(true);
    setFilteredToCategories(filterCity);
    setShowPastEvents(false);
    setIsCategory(false);
    setSidebar(false);

    // setHead(e.target.value);
    await setHead(`${e.target.value} activitys`);
    setTimeout(() => {
      setNewValue("");
    }, 2000);
  };
  return (
    <>
      <div className="">
        <select
          id="countries"
          value={newValue}
          className="bg-[#F5F5F5]   w-44 px-4 py-3 font-semibold text-gray-600 shadow-md shadow-gray-300 cursor-pointer flex rounded-md  outline-none "
          onChange={handleCity}
        >
          <option defaultValue="Choose a country" className=" font-bold">
            Select City
          </option>
          {city &&
            city.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default SelectInput;
