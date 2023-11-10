import React, { useContext } from 'react'
import DateInput from './DateInput';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';
import { NavLink } from 'react-router-dom';
import { SiteContext } from '../context/SiteContext';


const Sidebar = ({ isSidebarOpen }) => {
  const { isValid, setIsValid, navigate } = useContext(SiteContext)
  const handleSignout = (e) => {
    setIsValid(false)
    localStorage.removeItem("onlineUser")
    navigate("/login")
  }

  return (
    <>
      <nav
        className={`bg-gray-800  p-5 lg:hidden  ${isSidebarOpen ? "hidden" : "flex"
          }`}
      >
        <div className="w-[100%] h-full flex items-center justify-center  ">
          <div className="w-full grid gap-2 ">
            <div className="flex items-center">
              <ul className="flex flex-col items-start  font-medium">
                <li><NavLink to="/" className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease duration-200 ">Home</NavLink></li>
                <li><NavLink to="/about" className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease duration-200 ">About</NavLink></li>
                <li>
                  {
                    isValid && <NavLink to="/favorites" className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease duration-200 "> Favorites</NavLink>
                  }

                </li>
                <li>
                  {
                    isValid && <NavLink to="/payment" className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease duration-200 "> Payments</NavLink>
                  }
                </li>
                <li>
                  {
                    isValid && <NavLink to="/cart" className="text-gray-50 text-lg  hover:pl-2 hover:text-[#BC1A45] ease duration-200 ">Cart</NavLink>
                  }
                </li>
              </ul>
            </div>

            <div className="flex flex-col lg:hidden items-center justify-center mt-5 lg:mt-0 space-y-2 ">
              <div className="flex items-center justify-center  space-x-2">
                <DateInput />
                <SelectInput />
              </div>
              <SearchInput />
            </div>
            <div className=" flex items-center justify-between   mt-5  lg:hidden">
              {
                !isValid ? (<>
                  <NavLink to="/login" className="flex items-center justify-center w-36 px-3 py-2 text-sm font-medium text-center text-gray-800 bg-gray-50 rounded-full hover:bg-gray-600 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 ease-in duration-150">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="flex items-center justify-center w-36 px-3 py-2 text-sm font-medium text-center text-gray-800 bg-gray-50 rounded-full hover:bg-gray-600 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 ease-in duration-150">
                    Sign Up
                  </NavLink>
                </>) : <button onClick={handleSignout} to="/signup" href="#" className="mr-6 text-sm text-blue-600 dark:text-blue-500 hover:underline ml-1">Sign out</button>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar
