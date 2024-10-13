import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import "./manager.css";

const Managers = () => {
    const [managers, setManagers] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/user/managers",
                    { withCredentials: true }
                );
                setManagers(data.managers);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchManagers();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleDeleteManager = async (Id) => {
        try {
            await axios.delete(`http://localhost:4000/api/user/manager/delete/${Id}`, { withCredentials: true });
            setManagers(managers.filter(manager => manager._id !== Id));
            toast.success("Manager deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page">
            <div className="flex flex-col justify-center items-center head_text text-center mb-8">
                <h1 className="red_gradient text-4xl font-bold mb-2">Managers</h1>
            </div>
            <div className="flex items-center justify-between mt-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-8 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/>
                        </svg>
                    </div>
                </div>
                <Link style={{textDecoration:'none'}} to='/create_manager' className='btn btn-primary bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 ml-1 text-white'>
                    Add Manager
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {managers && managers.length > 0 ? (
                            managers.map((manager, index) => (
                                <tr key={index}>
                                <td className="border px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={manager.avatar && manager.avatar.url}
                                        alt="manager avatar"
                                        className="w-12 h-12 object-cover rounded-full img-zoom"
                                    />
                                </td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{manager.username}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">{manager.phone}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">{manager.Department}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <button onClick={() => handleDeleteManager(manager._id)} className="text-red-600 hover:text-red-800">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                                ) : (
                                <tr>
                                    <td colSpan="7" className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center">No Registered Managers Found!</td>
                                </tr>
                            )}
                    </tbody>
            </table>
        </div>
    </section>
);
};

export default Managers;
