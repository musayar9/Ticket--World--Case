import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";
import SearchInput from "./SearchInput";
import { AiFillHeart } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
function Navbar() {
  const { isValid, setIsValid, navigate, sidebar, setSidebar, favList, cartList } =
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

          {isValid && (
            <div className="flex justify-start items-center ml-4 list-none h-[60px]">
              <SearchInput />
            </div>
          )}

          <div>
            {!isValid ? (
              <>
                <NavLink
                  to="/login"
                  className="mr-3 text-sm text-gray-50  bg-blue-700 px-4 py-2 rounded-md"
                >
                  Login{" "}
                </NavLink>
                <NavLink
                  to="/signup"
                  className="mr-6 text-sm text-gray-50  bg-blue-700 px-4 py-2 rounded-md"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="flex items-center justify-center p-2">
                <NavLink to="/cart" className="mr-4">
                  <button className="relative">
                    <BsCart4 size={36} className=" bg-transparent" />
                    <span className="flex items-center justify-center absolute top-1 -right-1 w-4 h-4 p-2.5 rounded-full bg-gray-50 text-blue-700">
                      {cartList?.length ?? "0"}
                    </span>
                  </button>
                </NavLink>
                <button
                  onClick={handleSignout}
                  to="/signup"
                  className="mr-6 text-sm text-blue-700  bg-gray-50 font-semibold px-4 py-2 rounded-md hover:bg-blue-700 hover:text-gray-50  ease duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="w-[100%]" onClick={showSidebar}>
            <li className="bg-[#010a3bfd] w-[100%] h-[80px] flex items-center justify-start">
              <Link
                to="#"
                className="ml-[2rem] absolute top-8 text-[2rem] bg-none"
                onClick={showSidebar}
              >
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="flex justify-start items-center ml-4 list-none h-[60px] border">
              <NavLink
                to="/"
                className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md  hover:bg-[#1a83ff]"
              >
                <AiIcons.AiFillHome />
                <span className="ml-[16px]"> Home</span>
              </NavLink>
            </li>
            {isValid && (
              <>
                <li className="flex justify-start items-center ml-4 list-none h-[60px]">
                  <NavLink
                    to="/favorites"
                    className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md hover:bg-[#1a83ff]"
                  >
                    <AiFillHeart className="text-gray-50" />
                    <span className="ml-[16px]"> Favorites</span>
                  </NavLink>
                </li>
                <li className="flex justify-start items-center ml-4 list-none h-[60px]">
                  <NavLink
                    to="/payment"
                    className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md hover:bg-[#1a83ff]"
                  >
                    <MdPayment className="text-gray-50" />
                    <span className="ml-[16px]">Payment</span>
                  </NavLink>
                </li>
              </>
            )}

            <li className="flex justify-start items-center ml-4 list-none h-[60px]">
              <NavLink
                to="/about"
                className="text-[#f5f5f5] text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md hover:bg-[#1a83ff]"
              >
                <FcAbout className="text-gray-50" />
                <span className="ml-[16px]"> About</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
