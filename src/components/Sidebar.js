import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/img/logo.png";
import { Context } from '..';
import axios from 'axios';
import { toast } from 'react-toastify';

// icon
import { MdDashboard, MdLogout } from 'react-icons/md';
import { PiFlagBanner } from 'react-icons/pi';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { AiFillProduct, AiOutlineSolution } from 'react-icons/ai';
import { FaNewspaper, FaRegFileVideo } from 'react-icons/fa';
import { IoDocumentSharp } from "react-icons/io5";
import { TbUsersPlus } from 'react-icons/tb';
import { FaMessage } from "react-icons/fa6";

function Sidebar() {
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
        <>
            <button 
                className="sm:hidden fixed top-4 left-4 z-50"
                onClick={() => setShow(!show)}
            >
                <span className="text-2xl">&#9776;</span> {/* Icon hamburger */}
            </button>
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 h-screen transition-transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"} ${isCollapsed ? "w-16" : "w-64"}`}
                aria-label="Sidebar"
                style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
            >
                <div className={`h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ${isCollapsed ? "px-1" : "px-3"}`}>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <img src={Logo} alt='' className={`${isCollapsed ? "hidden" : "block"}`} />
                        </li>
                        <li className="sm:block hidden" onClick={() => setIsCollapsed(!isCollapsed)}>
                            <button className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {isCollapsed ? '→' : '←'} {/* Icon thu nhỏ/mở rộng */}
                            </button>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdDashboard />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Dashboard</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/message" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaMessage />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Message</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <PiFlagBanner />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Banner</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/service" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiOutlineBriefcase />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Service</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/product" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiFillProduct />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Product</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/solution" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineSolution />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Solution</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/new" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaNewspaper />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>News</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/document" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaRegFileVideo />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Documents</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/manager" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IoDocumentSharp />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Manager</span>
                            </Link>
                        </li>
                        <li onClick={() => setShow(!show)}>
                            <Link to="/user" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <TbUsersPlus />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Users</span>
                            </Link>
                        </li>
                        <li onClick={() => { setShow(!show); handleLogout(); }}>
                            <Link to="/" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdLogout />
                                <span className={`ms-3 ${isCollapsed ? "hidden" : "inline"}`}>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
