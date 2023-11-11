import React, { useContext, useState } from "react";
import images from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";

const Navbar = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isValid, setIsValid, navigate } = useContext(SiteContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignout = (e) => {
    setIsValid(false);
    localStorage.removeItem("onlineUser");
    navigate("/login");
  };

  return (
    <>
      <div>
        <nav className=" border-gray-200  dark:bg-gray-900 relative bg-black">
          <div className="flex flex-wrap justify-between items-center relative mx-auto max-w-screen-xl p-4">
            <a href="https://flowbite.com" className="flex items-center ">
              <img
                src={images}
                className="h-16 w-16 mr-3 bg-transparent rounded-full"
                alt="Flowbite Logo"
              />
            </a>
            <div className="hidden lg:flex items-center justify-evenly mt-10">
              <DateInput />
              <SearchInput />
              <SelectInput />
            </div>
            <div className="flex items-center  lg:hidden mr-2">
              <button className="text-white" onClick={toggleSidebar}>
                <FaBars />
              </button>
            </div>
            <div className=" items-center  hidden lg:flex">
              {!isValid ? (
                <>
                  <NavLink
                    to="/login"
                    className="mr-3 text-sm text-gray-50 hover:underline"
                  >
                    Login{" "}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="mr-6 text-sm text-gray-50 hover:underline"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={handleSignout}
                  to="/signup"
                  className="mr-6 text-sm text-blue-600 dark:text-blue-500 hover:underline ml-1"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        </nav>
        <div className="w-full divide-y border  border-[#BC1A45]"></div>
        <nav className="bg-black hidden lg:flex  p-5">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-md  ">
                <li>
                  <NavLink to="/" className="text-gray-50  hover:underline">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="text-gray-50 hover:underline">
                    About
                  </NavLink>
                </li>
                <li>
                  {isValid && (
                    <NavLink
                      to="/favorites"
                      className="text-gray-50 hover:underline"
                    >
                      Favorites
                    </NavLink>
                  )}
                </li>
                <li>
                  {isValid && (
                    <NavLink
                      to="/payment"
                      className="text-gray-50 hover:underline"
                    >
                      Payment
                    </NavLink>
                  )}
                </li>
                <li>
                  {isValid && (
                    <NavLink
                      to="/cart"
                      className="text-gray-50 hover:underline"
                    >
                      Cart
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};

export default Navbar;
