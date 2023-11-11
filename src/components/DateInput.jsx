import React, { useContext, useState } from "react";
import { isToday, format } from "date-fns";
import { parseISO } from "date-fns";
import tr from "date-fns/locale/tr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import { SiteContext } from "../context/SiteContext";

const DateInput = () => {
  const [date, setDate] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [concertData, filteredToCategories, setFilteredCategories] =
    useActivitiesAxiosApi();
  const { isValid, setSidebar } = useContext(SiteContext);
  const dateFormat = (dateValue) => {
    const parsedDate = parseISO(dateValue);
    const formattedDate = format(parsedDate, "d  MMMM  EEEE yyyy", {
      locale: tr,
    });
    return formattedDate;
  };

  const showToast = (dateValue) => {
    toast.success(`${dateValue} tarihine göre veriler filrelleniyor`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDate = async (e) => {
    setDate(e.target.value);
    const filterValue = await concertData.filter(
      (d) => d.date === e.target.value
    );
    setDateFilter(filterValue);
    setFilteredCategories(filterValue);
    if (isValid) {
      showToast(dateFormat(e.target.value));
    }

    // setHead(dateFormat(e.target.value));
    setSidebar(false);
    setDate("");
  };

  return (
    <>
      <div className="">
        <input
          type="date"
          className=" bg-gray-50 border-2 p-4  border-[#BC1A45] text-gray-900 text-sm rounded-full focus:ring-[#BC1A45] focus:border-[#ff648d] flex "
          placeholder="Select date"
          onChange={handleDate}
          value={date}
          min={isToday(new Date()) ? format(new Date(), "yyyy-MM-dd") : ""}
        />
      </div>
    </>
  );
};

export default DateInput;
