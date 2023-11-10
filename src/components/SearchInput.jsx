import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");


  //   useEffect(() => {
  //     const filterSearch = data.filter((v) => {
  //       const newSearch =
  //         (v?.artist && v?.artist.toLowerCase().includes(search.toLowerCase())) ||
  //         (v?.title && v?.title.toLowerCase().includes(search.toLowerCase()));
  //       return newSearch;
  //     });

  //     setSearchData(filterSearch);
  //   }, [search]);
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setFilter(searchData);
  //     setHead(`${search} filtreleme sonuçlarr;`);
  //     setTimeout(() => {
  //       setSearch("");
  //     }, 2000);
  //   };


  return (
    <div className="md:absolute top-16  z-20">
      <form className=" w-64 md:w-72 lg:w-96 ">
        <div className="relative flex items-center justify-center">
          <input
            type="search"
            id="default-search"
            className="block rounded-full  w-full p-4 pl-9 md:pl-11 text-sm text-gray-900 border-2   border-[#BC1A45] bg-gray-50 focus:ring-[#BC1A45] focus:border-[#ff648d] "
            placeholder="Sanatçı ve Başlığa göre ara"
            required
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
