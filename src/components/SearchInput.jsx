import React, { useState, useEffect, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import { SiteContext } from "../context/SiteContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [concertData, filteredToCategories, setFilteredCategories] =
    useActivitiesAxiosApi();
  const { sidebar, setSidebar } = useContext(SiteContext);
  useEffect(() => {
    const filterSearch = concertData.filter((v) => {
      const newSearch =
        (v?.artist && v?.artist.toLowerCase().includes(search.toLowerCase())) ||
        (v?.title && v?.title.toLowerCase().includes(search.toLowerCase()));
      return newSearch;
    });

    setSearchData(filterSearch);
  }, [search]);
  // console.log(filteredToCategories);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredCategories(searchData);

    setSidebar(false);
    setTimeout(() => {
      setSearch("");
    }, 2000);
    navigate("/");
  };
  // console.log("fiteredDate", filteredToCategories);
  return (
    <div
      className="
    "
    >
      <form className="  " onSubmit={handleSubmit}>
        <div className="relative flex items-center justify-center group">
          <input
            type="search"
            id="search"
            className=" pl-11 w-72 cursor-pointer text-gray-50 bg-transparent border-b border-gray-50 focus:outline-none pb-3 transition duration-500 "
            placeholder="Sanatçı ve Başlığa göre ara"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute pb-3   left-4 flex items-center 
            pointer-events    font-bold"
          >
            <BsSearch className="text-red-800 bg-transparent" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
