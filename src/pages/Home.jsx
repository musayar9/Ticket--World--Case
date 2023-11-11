import { useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";
import { ToastContainer } from "react-toastify";
import Card from "../components/Card";
import useActivitiesAxiosApi from "../customHooks/useActivitiesAxiosApi";
import SeatsModal from "../components/SeatsModal";
import HeaderSlider from "../components/HeaderSlider";
import FilterArea from "../components/FilterArea";

export default function Home() {
  const [concertData] = useActivitiesAxiosApi();

  const { showSuccessToast, isLogin, setIsLogin } = useContext(SiteContext);

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
      <div className="flex w-[97%] flex-wrap m-auto">
        <div className="flex w-[97%] flex-wrap m-auto">
          {concertData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
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
