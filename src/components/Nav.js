import React, { useContext, useState } from 'react';
import user from "../assets/img/user/user.jpg";
import { Link } from 'react-router-dom';
// icon
import { IoIosArrowDown } from "react-icons/io"
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { Context } from '..';
import axios from 'axios';
import { toast } from 'react-toastify';



const Nav = () => {

  const [show, setShow] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const handleLogout = async () => {
        await axios
            .get("http://localhost:4000/api/user/admin/logout", { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };



  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Song Nhat Nguyen</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={user} alt="User"/>
          {/* <!-- Dropdown menu --> */}
          <div className='relative group px-8 py-3 transition-all'>
            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-blue-300'>
              <span className='flex items-center'><IoSettings /></span>
              <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0' />
            </p>
            {/* open menu */}
            <div className='absolute right-0 top-full hidden w-auto flex-col gap-1 rounded-lg bg-slate-50 py-3 shadow-md transition-all group-hover:flex'>
              <Link to="/profile" className='flex items-center py-1 px-6 text-black hover:text-slate-400' onClick={() => setShow(!show)}>
                <span className='flex items-center gap-2'>
                  <CgProfile className='transition-transform transform group-hover:scale-125' />
                  Profile
                </span>
              </Link>
              <Link to="/setting" className='flex items-center py-1 px-6 text-black hover:text-slate-400' onClick={() => setShow(!show)}>
                <span className='flex items-center gap-2'>
                  <IoSettings className='transition-transform transform group-hover:scale-125' />
                  Setting
                </span>
              </Link>
              <Link to="" className='flex items-center py-1 px-6 text-black hover:text-slate-400' onClick={() => { setShow(!show); handleLogout(); }}>
                <span className='flex items-center gap-2'>
                  <BiLogOut className='transition-transform transform group-hover:scale-125' />
                  Logout
                </span>
          </Link>
      </div>
    </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          {/* Add any additional navigation items here */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;