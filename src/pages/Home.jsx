import { useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";
import { ToastContainer } from "react-toastify";
import Card from "../components/Card";
import HeaderSlider from "../components/HeaderSlider";
import FilterArea from "../components/FilterArea";
import CategoriesButton from "../components/CategoriesButton";
import { FiArrowUp } from "react-icons/fi";
import { backToTop } from "../components/Functions";

export default function Home() {
  const { filteredToCategories, showSuccessToast, isLogin, setIsLogin, head } =
    useContext(SiteContext);

  useEffect(() => {
    if (isLogin) {
      showSuccessToast("Login success");
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <HeaderSlider />
      <FilterArea />
      <CategoriesButton />
      <h2 className="flex item-center ml-5 text-xl  lg:text-2xl font-bold capitalize mb-4">
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
          className="border border-gray-700 px-5 py-2 
                                                    rounded-xl flex items-center justify-between space-x-3
                                                    hover:bg-gray-600 hover:text-gray-50 duration-700
                                                    hover:border-gray-300 active:translate-y-7
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
