import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import { SiteContext } from "../context/SiteContext";

const SelectInput = () => {
  const [city, setCity] = useState([]);
  // const [selectValue, setSelectValue] = useState("");
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
  } = useContext(SiteContext);

  useEffect(() => {
    const fetchCity = async () => {
      const res = await axios.get("http://localhost:5030/api/city");
      const data = await res.data.city;
      setCity(data);
    };

    fetchCity();
  }, []);

  const showToast = (cityValue) => {
    toast.success(`${cityValue} şehrine göre veriler filtreleniyor`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleCity = async (e) => {
    setNewValue(e.target.value);
    const filterCity = await concertData.filter(
      (v) => v.city === e.target.value
    );

    setFilteredToCategories(filterCity);
    setShowPastEvents(false);
    setIsCategory(false);
    setSidebar(false);
    if (isValid) {
      showToast(e.target.value);
    }

    // setHead(e.target.value);
    setHead(`Filter results by ${e.target.value}`);
    setTimeout(() => {
      setNewValue("");
    }, 2000);
  };
  // console.log("filteredCategories", filteredToCategories);
  return (
    <>
      <div className="">
        <select
          id="countries"
          value={newValue}
          className="bg-gray-300  w-44 px-4 py-3 text-gray-600 font-semibold flex rounded-md  outline-none "
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
