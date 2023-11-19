import React, { useState, useEffect, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { SiteContext } from "../context/SiteContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");

  const {
    concertData,
    setFilteredToCategories,
    setSidebar,
    setIsCategory,
    setShowPastEvents,
    setHead,
    isSearch,
    setIsSearch,
    isSearchInput,
    setIsSearchInput,
  } = useContext(SiteContext);
  useEffect(() => {
    const filterSearch = concertData.filter((v) => {
      const newSearch =
        (v?.artist && v?.artist.toLowerCase().includes(search.toLowerCase())) ||
        (v?.title && v?.title.toLowerCase().includes(search.toLowerCase()));
      return newSearch;
    });

    setSearchData(filterSearch);
  }, [search]);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredToCategories(searchData);
    setIsCategory(false);
    setIsSearch(true)
    setIsSearchInput(true)
    setShowPastEvents(false);
    setSidebar(false);
    setHead(`${search}`);
    setTimeout(() => {
      setSearch("");
    }, 2000);
    navigate("/");
  };
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
            className="pl-8 md:pl-11 w-44 text-sm text-[#f5f5f5] md:text-lg md:w-72 cursor-pointer placeholder:text-[#f5f5f5] bg-transparent border-b border-[#f5f5f5] focus:outline-none pb-3 transition duration-500 "
            placeholder="Search by artist or title"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute pb-3  left-2 md:left-4 flex items-center 
            pointer-events    font-bold"
          >
            <BsSearch className="text-[#f5f5f5] bg-transparent" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
