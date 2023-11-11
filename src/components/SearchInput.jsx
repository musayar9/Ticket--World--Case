import React, { useState, useEffect, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import { SiteContext } from "../context/SiteContext";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [concertData, filteredToCategories, setFilteredCategories] =
    useActivitiesAxiosApi();
const {sidebar, setSidebar} = useContext(SiteContext)
  useEffect(() => {
    const filterSearch = concertData.filter((v) => {
      const newSearch =
        (v?.artist && v?.artist.toLowerCase().includes(search.toLowerCase())) ||
        (v?.title && v?.title.toLowerCase().includes(search.toLowerCase()));
      return newSearch;
    });

    setSearchData(filterSearch);
  }, [search]);
  console.log(filteredToCategories);
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
            id="default-search"
            className="block   w-full p-4 pl-9 md:pl-11 text-sm text-gray-900 border-2   border-[#BC1A45] bg-gray-50 focus:ring-[#BC1A45] focus:border-[#ff648d] "
            placeholder="Sanatçı ve Başlığa göre ara"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 left-3 md:left-4 flex items-center 
            pointer-events text-black  font-bold"
          >
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
