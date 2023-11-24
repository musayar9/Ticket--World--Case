import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosConcertApi } from "../axios/axiosConcertApi";
import Loading from "../components/Loading";
import Error from "../components/Error";
export const SiteContext = createContext();

export default function SiteContextProvider({ children }) {
  const navigate = useNavigate();
  const showSuccessToast = (message) =>
    toast.success(message, { hideProgressBar: true, pauseOnHover: true });
  const showErrorToast = (message) =>
    toast.error(message, { hideProgressBar: true, pauseOnHover: true });

  const [isSignup, setIsSignup] = useState(false); // for toast message
  const [isLogin, setIsLogin] = useState(false); // for toast message
  const [isValid, setIsValid] = useState(); // for authorization
  const [head, setHead] = useState(); // for category filtered title
  const [favList, setFavList] = useState(); // fav
  const [cartList, setCartList] = useState(); // cart
  const [sidebar, setSidebar] = useState(false); // sidebar
  const [isOpenModal, setIsOpenModal] = useState(false); // seat modal
  const [isAvailableSelectedSeat, setIsAvailableSelectedSeat] = useState(); // control of selectedSeat - true/false
  const [selectedSeats, setSelectedSeats] = useState([]); // selectedSeat List
  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

  const location = useLocation();
  const currentPathName = location.pathname;

  // location onchange olduğunda selectedSeat i remove et
  useEffect(() => {
    localStorage.removeItem("selectedSeats");
    setIsAvailableSelectedSeat(false);
    setAvatarUrl(JSON.parse(localStorage.getItem("onlineUser"))?.avatar);
  }, [location]);

  useEffect(() => {
    const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    if (storedOnlineUser?.id) {
      navigate(`${currentPathName}`);
      setIsValid(true);
      setFavList([
        ...JSON.parse(localStorage.getItem("onlineUser"))?.favorites,
      ]);
      setCartList([...JSON.parse(localStorage.getItem("onlineUser"))?.cart]);
      setAvatarUrl(JSON.parse(localStorage.getItem("onlineUser"))?.avatar);
    } else {
      navigate("/login");
    }
  }, []);

  let totalCost = 0;
  cartList?.forEach((concert) => {
    concert.selectedSeats.forEach((seat) => {
      const ticketPrice = Number(concert.item.ticketPrice);
      const rowIndex = seat.rowIndex;
      totalCost += ticketPrice * (8 / rowIndex);
    });
  });
  const [concertData, setConcertData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [filteredToCategories, setFilteredToCategories] = useState();
  const [isCategory, setIsCategory] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);
  const getData = async () => {
    try {
      const response = await axiosConcertApi.get("/api/activity");
      const responseData = response.data;
      if (response.status !== 200) {
        setIsError(true);
        setError("Data is not found");
        throw new Error("Data is not found");
      }
      setConcertData(responseData.activity);
      setIsLoading(false);
      if (concertData) {
        setFilteredToCategories(responseData.activity);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("erorr", error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error message={error} />;
  }

  return (
    <SiteContext.Provider
      value={{
        showSuccessToast,
        showErrorToast,
        navigate,
        isSignup,
        setIsSignup,
        isLogin,
        setIsLogin,
        isValid,
        setIsValid,
        favList,
        setFavList,
        cartList,
        setCartList,
        sidebar,
        setSidebar,
        isOpenModal,
        setIsOpenModal,
        isAvailableSelectedSeat,
        setIsAvailableSelectedSeat,
        selectedSeats,
        setSelectedSeats,
        totalCost,
        concertData,
        filteredToCategories,
        setFilteredToCategories,
        isCategory,
        setIsCategory,
        showPastEvents,
        setShowPastEvents,
        head,
        setHead,
        isOpenAvatarModal,
        setIsOpenAvatarModal,
        avatarUrl,
        setAvatarUrl,
        isSearch,
        setIsSearch,
        isSearchInput,
        setIsSearchInput,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}
