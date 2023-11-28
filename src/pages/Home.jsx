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
import { BiSolidErrorCircle } from "react-icons/bi";
import { TbError404 } from "react-icons/tb";
import { Helmet } from "react-helmet";
import images from "../assets/activity.avif";
import Loading from "../components/Loading";
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
    isSearch,
    setIsSearch,
    isSearchInput,
    setIsSearchInput,
  } = useContext(SiteContext);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLogin) {
      showSuccessToast("Login success");
      setIsLogin(false);
    }
    if (location.pathname === "/") {
      setShowPastEvents(false);
      setIsCategory(true);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Ticket World</title>
        <meta name="description" content="ticket-world" />
      </Helmet>
      {images === null ? (
        <Loading />
      ) : (
        <div className="">
          <HeaderSlider />
          <FilterArea />
          <CategoriesButton />
          {isSearch && (
            <h2 className=" mx-auto px-4 py-2 w-fit text-[#010A3B]  text-xl rounded-lg  lg:text-2xl font-bold capitalize mb-4">
              {head}
            </h2>
          )}

          <>
            {filteredToCategories?.length !== 0 ? (
              <div className="flex w-[100%] md:w-[97%]  mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto overflow-y-hidden">
                  {filteredToCategories &&
                    filteredToCategories?.map((item, index) => (
                      <Card key={index} item={item} />
                    ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center flex-col justify-center   bg-gray-50 text-red-800 rounded-lg mb-10">
                  <div className="flex items-center justify-center">
                    <BiSolidErrorCircle className="text-red-800 w-24 h-24" />
                    <TbError404 className="text-red-800 w-36 h-36" />
                  </div>

                  <p className="text-2xl font-bold capitalize">
                    Data is not found
                  </p>
                </div>
              </div>
            )}
          </>

          {filteredToCategories?.length >= 10 && (
            <button
              className="animate-bounce border bg-[#949494] opacity-90 p-4 text-white font-semibold
                                                    rounded-full flex items-center justify-between space-x-3
                                                  hover:bg-[#7a7a7a] hover:text-[#f3f3f3] duration-700
                                                    hover:border-[#7a7a7a] active:translate-y-7
                                                    "
              onClick={backToTop}
              style={{ bottom: "20px", right: "40px", position: "fixed" }}
            >
              <FiArrowUp className="text-lg" />
            </button>
          )}

          <ToastContainer
            autoClose={750}
            pauseOnFocusLoss={true}
            pauseOnHover={false}
          />
        </div>
      )}
    </>
  );
}
