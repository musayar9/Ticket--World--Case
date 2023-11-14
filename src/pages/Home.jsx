import { useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";
import { ToastContainer } from "react-toastify";
import Card from "../components/Card";
import HeaderSlider from "../components/HeaderSlider";
import FilterArea from "../components/FilterArea";
import CategoriesButton from "../components/CategoriesButton";
import { FiArrowUp } from "react-icons/fi";
import { backToTop } from "../components/Functions";
import { useLocation } from "react-router";

export default function Home() {
  const {
    concertData,
    filteredToCategories,
    setFilteredToCategories,
    showSuccessToast,
    isLogin,
    setIsLogin,
    head,
    setHead,
    setShowPastEvents,
    setIsCategory,
  } = useContext(SiteContext);
  const location = useLocation();
  useEffect(() => {
    if (isLogin) {
      showSuccessToast("Login success");
      setIsLogin(false);
    }

    if (location.pathname === "/") {
      setFilteredToCategories(concertData);
      setShowPastEvents(false)
      setIsCategory(true)
      setHead(`Filter Results By All`);
      
    }
  }, []);

  return (
    <>
      <HeaderSlider />
      <FilterArea />
      <CategoriesButton />
      <h2 className="flex item-center ml-16 text-xl  lg:text-2xl font-bold capitalize mb-4">
        {head}
      </h2>
      <div className="flex w-[100%] md:w-[97%]  m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto overflow-y-hidden">
          {filteredToCategories?.length !== 0 ? (
            filteredToCategories &&
            filteredToCategories?.map((item, index) => (
              <Card key={index} item={item} />
            ))
          ) : (
            <div>Data is Not fOUND</div>
          )}
        </div>
      </div>

      {filteredToCategories?.length >= 10 && (
        <button
          className="border bg-[#060b26] opacity-90 px-5 py-2  text-gray-50 font-semibold
                                                    rounded-xl flex items-center justify-between space-x-3
                                                    hover:bg-gray-600 hover:text-[#060b26] duration-700
                                                    hover:border-[#060b26] active:translate-y-7
                                                    "
          onClick={backToTop}
          style={{ bottom: "20px", right: "40px", position: "fixed" }}
        >
          <FiArrowUp /> <span>Back To Top</span>
        </button>
      )}

      <ToastContainer
        autoClose={750}
        pauseOnFocusLoss={true}
        pauseOnHover={false}
      />
    </>
  );
}
