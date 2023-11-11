import React, { useState, useEffect, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import { SiteContext } from "../context/SiteContext";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredCategories(searchData);

    setSidebar(false);
    setTimeout(() => {
      setSearch("");
    }, 2000);
  };

  return (
    <div
      className="
    "
    >
      <form className="  " onSubmit={handleSubmit}>
        <div className="relative flex items-center justify-center">
          <input
            type="search"
            id="search"
            className="flex   w-full p-4 pl-10 text-sm text-gray-900 border-2 bg-blue-700  rounded-lg focus:none "
            placeholder="Sanatçı ve Başlığa göre ara"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute   left-4 flex items-center 
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
