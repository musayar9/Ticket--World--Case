import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { SiteContext } from "../context/SiteContext";
import SearchInput from "./SearchInput";
import { AiFillHeart } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { Avatar } from "@mui/material";
import { IoLogInOutline } from "react-icons/io5";
function Navbar() {
  const {
    isValid,
    setIsValid,
    navigate,
    sidebar,
    setSidebar,
    favList,
    cartList,
    concertData,
    setFilteredToCategories,
    isOpenAvatarModal,
    setIsOpenAvatarModal,
    avatarUrl,
  } = useContext(SiteContext);

  const handleSignout = (e) => {
    setIsValid(false);
    localStorage.removeItem("onlineUser");
    navigate("/login");
    setFilteredToCategories(concertData);
  };
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="fixed top-0 w-full  z-10 ">
      <div className="bg-[#F5F5F5] h-[80px] flex justify-between items-center ">
        <Link to="#" className="ml-[2rem] text-[2rem] bg-none">
          <FaIcons.FaBars
            onClick={showSidebar}
            className="w-8 h-8 bg-transparent text-gray-600 hover:text-gray-800 duration-150 ease-out"
          />
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
                className="mr-3 text-sm text-gray-50  bg-gray-500 px-4 py-2 rounded-md"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="mr-6 text-sm text-gray-50  bg-gray-500 px-4 py-2 rounded-md"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="flex items-center justify-center p-2 ">
              <NavLink to="/cart" className="mr-4">
                <button className="relative group ">
                  <BsCart4 className=" bg-transparent w-8 md:w-10 h-12 text-gray-500 group-hover:text-gray-800 ease-in transition duration-150 " />
                  <span className="flex items-center justify-center absolute top-1 -right-1 w-3 h-3 p-2.5 rounded-full bg-gray-50 text-gray-700 transition group-hover:bg-gray-700 group-hover:text-gray-50 ease-in duration-150">
                    {cartList?.length ?? "0"}
                  </span>
                </button>
              </NavLink>

              <button onClick={handleSignout} to="/signup" className=" ">
                <IoLogInOutline
                  title="Sign Out "
                  className="flex items-center  text-gray-500 w-8 md:w-10 h-12 mr-2 hover:text-gray-800 ease-in transition duration-150"
                />
                <span className="hidden  text-blue-700  bg-gray-50 font-semibold px-4 py-2 rounded-md hover:bg-blue-700 hover:text-gray-50  ease duration-200">
                  Sign out
                </span>
              </button>
              <button
                onClick={() => setIsOpenAvatarModal((prev) => !prev)}
                className="relative mr-6 ml-2 "
              >
                <Avatar alt="Travis Howard" src={avatarUrl} />
              </button>
            </div>
          )}
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="w-[100%]" onClick={showSidebar}>
          <li className="bg-[#f5f5f5] w-[100%] h-[80px] flex items-center justify-start">
            <Link
              to="#"
              className="ml-[2rem] absolute top-8 text-[2rem] bg-none"
              onClick={showSidebar}
            >
              <AiIcons.AiOutlineClose className="text-gray-600  hover:text-gray-800 transition duration-150 ease-out" />
            </Link>
          </li>

          <li className="flex justify-start items-center ml-4 list-none h-[60px] border">
            <NavLink
              to="/"
              className="text-gray-600 text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md  hover:bg-gray-400 hover:text-gray-50"
            >
              <AiIcons.AiFillHome />
              <span className="ml-[16px] "> Home</span>
            </NavLink>
          </li>
          {isValid && (
            <>
              <li className="flex justify-start items-center ml-4 list-none h-[60px]">
                <NavLink
                  to="/favorites"
                  className="text-gray-600 text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md  hover:bg-gray-400 hover:text-gray-50"
                >
                  <AiFillHeart className="text-gray-600" />
                  <span className="ml-[16px]"> Favorites</span>
                </NavLink>
              </li>
              <li className="flex justify-start items-center ml-4 list-none h-[60px]">
                <NavLink
                  to="/payment"
                  className="text-gray-600 text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md  hover:bg-gray-400 hover:text-gray-50"
                >
                  <MdPayment className="text-gray-600" />
                  <span className="ml-[16px]">Payment</span>
                </NavLink>
              </li>
            </>
          )}

          <li className="flex justify-start items-center ml-4 list-none h-[60px]">
            <NavLink
              to="/about"
              className="text-gray-600 text-[18px] w-[95%] h-[100%] flex items-center pl-4 rounded-md  hover:bg-gray-400 hover:text-gray-50"
            >
              <FcAbout className="text-gray-600" />
              <span className="ml-[16px]"> About</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
