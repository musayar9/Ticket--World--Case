import React from 'react'
import DateInput from './DateInput';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';


const Sidebar = ({  isSidebarOpen}) => {

  return (
    <>
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
                <DateInput />

                <SelectInput/>
              </div>

              <SearchInput />
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
    </>
  );
};

export default Sidebar
