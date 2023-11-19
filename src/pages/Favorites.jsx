import { useContext, useEffect, useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { SiteContext } from "../context/SiteContext";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet";
export default function Favorites() {
  const {
    favList,
    setFavList,
    filteredToCategories,
    setFilteredToCategories,
    concertData,
    setIsValid,
    setIsCategory,
    setIsSearch,
    setShowPastEvents,
  } = useContext(SiteContext);
  const location = useLocation();
 
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("onlineUser")) {
      setIsValid(true);
    }
    setFavList([...JSON.parse(localStorage.getItem("onlineUser"))?.favorites]);

    if (location.pathname === "/favorites") {
      setFilteredToCategories(concertData);
      setIsSearch(false);
      setIsCategory(true);
      setShowPastEvents(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Favorites</title>
        <meta name="description" content="favorites" />
      </Helmet>
      <div className="flex flex-col w-[97%] flex-wrap m-auto p-5 mt-8">
        {favList?.length !== 0 ? (
          <>
            <h1 className="text-3xl my-3 mt-20">Favorites:</h1>
            {favList?.map((item, index) => (
              <FavoriteCard key={index} item={item} />
            ))}
          </>
        ) : (
          <>
            <div
              className="p-4  my-7 w-[50%] text-lg text-gray-800 rounded-lg bg-gray-200 mt-20"
              role="alert"
            >
              <span className="font-medium">
                YOUR FAVORITE BASKET IS EMPTY !
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
