import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SiteContext = createContext();

export default function SiteContextProvider({ children }) {
    
  const navigate = useNavigate();
  const showSuccessToast = (message) => toast.success(message, { hideProgressBar: true, pauseOnHover: true });
  const showErrorToast = (message) => toast.error(message, { hideProgressBar: true, pauseOnHover: true });

  const [isSignup, setIsSignup] = useState(false); // for toast message
  const [isLogin, setIsLogin] = useState(false); // for toast message
  const [isValid, setIsValid] = useState(); // for authorization
  const [head, setHead] = useState(); // for category filtered title
  const [favList, setFavList] = useState(); // fav
  const [cartList, setCartList] = useState(); // cart
  const [sidebar, setSidebar] = useState(false); // sidebar
  const [isOpenModal, setIsOpenModal] = useState(false); // seat modal
  const [isAvailableSelectedSeat, setIsAvailableSelectedSeat] = useState() // control of selectedSeat - true/false

  const location = useLocation();
  const currentPathName = location.pathname;

  useEffect(() => {
    const storedOnlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    if (storedOnlineUser?.id) {
      navigate(`${currentPathName}`);
      setIsValid(true);
    } else {
      navigate("/login");
    }
  }, []);

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
        setIsAvailableSelectedSeat
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}
