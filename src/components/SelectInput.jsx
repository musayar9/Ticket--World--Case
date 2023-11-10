import axios from "axios";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SelectInput = ({ filter, setFilter, data, setHead }) => {
  const [city, setCity] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [newValue, setNewValue] = useState("");
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
    const filterCity = await data.filter((v) => v.city === e.target.value);
    setSelectValue(filterCity);
    setFilter(filterCity);
    showToast(e.target.value);
    setHead(e.target.value);
    setTimeout(() => {
      setNewValue("");
    }, 2000);
  };

  return (
    <>
      <div className="md:absolute top-16 md:right-24 lg:right-44  z-20">
        <div>
          <select
            id="countries"
            value={newValue}
            className="bg-gray-50 w-32 md:w-36 lg:w-44 border-2 p-4  border-[#BC1A45] text-gray-900 text-sm rounded-full focus:ring-[#BC1A45] focus:border-[#ff648d] flex "
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

      {/* {filter.length > 0 ? (
        <>
          {filter.map((activity) => (
            <p key={activity._id}>{activity.title}</p>
          ))}
        </>
      ) : (
        <p>Veri bulunamadı</p>
      )} */}
    </>
  );
};

export default SelectInput;
