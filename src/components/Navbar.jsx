import React, { useState } from "react";
import images from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import DateInput from "./DateInput";

import SelectInput from "./SelectInput";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";
const Navbar = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div>
        {/* Büyük Ekran Navbar */}

        <>
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
                <a
                  href="tel:5541251234"
                  className="mr-6 text-sm text-gray-50 hover:underline"
                >
                  Login
                </a>
                <a href="#" className="text-sm text-blue-600hover:underline">
                  Sign Up
                </a>
              </div>
            </div>
          </nav>
          <div className="w-full divide-y border  border-[#BC1A45]"></div>
          <nav className="bg-black hidden lg:flex  p-5">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-md  ">
                  <li>
                    <p className="text-gray-50  hover:underline">Home</p>
                  </li>
                  <li>
                    <a className="text-gray-50 hover:underline">Company</a>
                  </li>
                  <li>
                    <p className="text-gray-50  hover:underline">Team</p>
                  </li>
                  <li>
                    <p className="text-white hover:underline">Features</p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>

        {/* Küçük Ekran Navbar (Sidebar) */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        {/* <>
          <nav
            className={`bg-gray-800  p-5 lg:hidden  ${
              isSidebarOpen ? "hidden" : "flex"
            }`}
          >
            <div className="w-[100%] h-full flex items-center justify-center  ">
              <div className="w-full grid gap-2 ">
                <div className="flex items-center">
                  <ul className="flex flex-col items-start  font-medium">
                    <li>
                      <a
                        href="#"
                        className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease duration-200 "
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45]  ease-in duration-200"
                      >
                        Company
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease-in duration-200"
                      >
                        Team
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-50 text-lg   hover:pl-2 hover:text-[#BC1A45] ease-in duration-200"
                      >
                        Features
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col lg:hidden items-center justify-center mt-5 lg:mt-0 space-y-2 ">
                  <div className="flex items-center justify-center  space-x-2">
                    <DateInput
                      data={data}
                      setFilter={setFilter}
                      setHead={setHead}
                      filter={filter}
                    />

                    <SelectInput
                      data={data}
                      setFilter={setFilter}
                      setHead={setHead}
                      filter={filter}
                    />
                  </div>

                  <SearchInput
                    data={data}
                    setFilter={setFilter}
                    setHead={setHead}
                    filter={filter}
                  />
                </div>

                <div className=" flex items-center justify-between   mt-5  lg:hidden">
                  <button className="flex items-center justify-center w-36 px-3 py-2 text-sm font-medium text-center text-gray-800 bg-gray-50 rounded-full hover:bg-gray-600 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 ease-in duration-150">
                    Login
                  </button>
                  <button className="flex items-center justify-center w-36 px-3 py-2 text-sm font-medium text-center text-gray-800 bg-gray-50 rounded-full hover:bg-gray-600 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 ease-in duration-150">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </> */}
      </div>
    </>
  );
};

export default Navbar;
