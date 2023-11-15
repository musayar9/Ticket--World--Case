import React, { useContext, useState } from "react";
import { isToday, format } from "date-fns";
import { parseISO } from "date-fns";
import en from "date-fns/locale/en-US";

import { SiteContext } from "../context/SiteContext";

const DateInput = () => {
  const [date, setDate] = useState("");

  const {
    isValid,
    setSidebar,
    concertData,
    setFilteredToCategories,
    setIsCategory,
    setHead,
    setShowPastEvents,
    isSearch,
    setIsSearch,
  } = useContext(SiteContext);

  const dateFormat = (dateValue) => {
    const parsedDate = parseISO(dateValue);
    const formattedDate = format(parsedDate, "d  MMMM  EEEE yyyy", {
      locale: en,
    });
    return formattedDate;
  };

  const handleDate = async (e) => {
    setDate(e.target.value);
    const filterValue = await concertData.filter(
      (d) => d.date === e.target.value
    );

    setFilteredToCategories(filterValue);
    setIsCategory(false);
    setShowPastEvents(false);
    setIsSearch(true);

    setHead(`${dateFormat(e.target.value)}`);
    setSidebar(false);
    setTimeout(() => {
      setDate("");
    }, 2000);
  };

  return (
    <>
      <div className="cursor-pointer">
        <input
          type="date"
          className=" bg-[#F5F5F5]  w-44 px-4 py-3 font-semibold text-gray-700 shadow-md shadow-gray-300  cursor-pointer rounded-md  outline-none flex "
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
