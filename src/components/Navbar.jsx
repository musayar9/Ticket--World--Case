import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";
import SearchInput from "./SearchInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";

function Navbar() {
  const { isValid, setIsValid, navigate, sidebar, setSidebar } =
    useContext(SiteContext);

  const handleSignout = (e) => {
    setIsValid(false);
    localStorage.removeItem("onlineUser");
    navigate("/login");
  };
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="bg-[#060b26] h-[80px] flex justify-between items-center ">
          <Link to="#" className="ml-[2rem] text-[2rem] bg-none">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="flex justify-start items-center ml-4 list-none h-[60px]">
            <SearchInput />
          </div>
          <div>
            {!isValid ? (
              <>
                <NavLink
                  to="/login"
                  className="mr-3 text-sm text-gray-50 hover:underline bg-blue-700 px-4 py-2 rounded-md"
                >
                  Login{" "}
                </NavLink>
                <NavLink
                  to="/signup"
                  className="mr-6 text-sm text-gray-50 hover:underline bg-blue-700 px-4 py-2 rounded-md"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleSignout}
                to="/signup"
                className="mr-6 text-sm text-gray-50 hover:underline bg-blue-700 px-4 py-2 rounded-md"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="w-[100%]">
            <li className="bg-[#060b26] w-[100%] h-[80px] flex items-center justify-start">
              <Link
                to="#"
                className="ml-[2rem] absolute top-8 text-[2rem] bg-none"
                onClick={showSidebar}
              >
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="flex justify-start items-center ml-4 list-none h-[60px]">
              <SelectInput />
            </li>

            <li className="flex justify-start items-center ml-4 list-none h-[60px]">
              <DateInput />
            </li>
          </ul>
          <ul className="w-[100%]" onClick={showSidebar}>
            <li className="flex justify-start items-center ml-4 list-none h-[60px]">
              <NavLink
                to="/"
                className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md  hover:bg-[#1a83ff]"
              >
                <AiIcons.AiFillHome />
                <span className="ml-[16px]"> Home</span>
              </NavLink>
            </li>
            <li className="flex justify-start items-center ml-4 list-none h-[60px]">
              <NavLink
                to="/about"
                className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md hover:bg-[#1a83ff]"
              >
                <FcAbout className="text-gray-50" />
                <span className="ml-[16px]"> About</span>
              </NavLink>
            </li>
            <li className="flex justify-start items-center p-[8px 0px 8px 16px] list-none h-[60px]">
              {isValid && (
                <NavLink
                  to="/favorites"
                  className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center p-[0 16px] rounded-md hover:bg-[#1a83ff]"
                >
                  <span className="ml-[16px]"> Favorites</span>
                </NavLink>
              )}
            </li>
            <li className="flex justify-start items-center p-[8px 0px 8px 16px] list-none h-[60px]">
              {isValid && (
                <NavLink
                  to="/payment"
                  className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center p-[0 16px] rounded-md hover:bg-[#1a83ff]"
                >
                  <span className="ml-[16px]">Payment</span>
                </NavLink>
              )}
            </li>
            <li className="flex justify-start items-center p-[8px 0px 8px 16px] list-none h-[60px]">
              {isValid && (
                <NavLink
                  to="/cart"
                  className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center p-[0 16px] rounded-md hover:bg-[#1a83ff]"
                >
                  <span className="ml-[16px]">Cart</span>
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
