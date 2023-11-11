import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import { SiteContext } from "../context/SiteContext";



const SelectInput = () => {
  const [city, setCity] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [newValue, setNewValue] = useState("");
 const [concertData, filteredToCategories, setFilteredCategories] =
   useActivitiesAxiosApi();
 const { sidebar, setSidebar } = useContext(SiteContext);
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
    const filterCity = await concertData.filter((v) => v.city === e.target.value);
    setSelectValue(filterCity);
    setFilteredCategories(filterCity);
    setSidebar(false)
    showToast(e.target.value);
    // setHead(e.target.value);
    setTimeout(() => {
      setNewValue("");
    }, 2000);
  };
// console.log("filteredCategories", filteredToCategories);
  return (
    <>
      <div className="">
        <div>
          <select
            id="countries"
            value={newValue}
            className="bg-gray-50 w-full   border-[#BC1A45] text-gray-900 text-sm rounded-full focus:ring-[#BC1A45] focus:border-[#ff648d] flex "
            onChange={handleCity}
          >
            <option defaultValue="Choose a country">Şehir Seç</option>
            {city &&
              city.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
      </div>


    </>
  );
};

export default SelectInput;
