import { useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";
import { ToastContainer } from "react-toastify";
import Card from "../components/Card";
import HeaderSlider from "../components/HeaderSlider";
import FilterArea from "../components/FilterArea";
import CategoriesButton from "../components/CategoriesButton";

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

      <div className="flex w-[97%] flex-wrap m-auto">
        <h2 className="flex item-center ml-5 text-2xl font-bold capitalize mb-4">{head}</h2>
        <div className="flex w-[97%] flex-wrap m-auto">
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
      <ToastContainer
        autoClose={750}
        pauseOnFocusLoss={true}
        pauseOnHover={false}
      />
    </>
  );
}
