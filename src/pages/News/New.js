import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../..';

const New = () => {
    const [news, setNews] = useState([]);
    const { isAuthenticated } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/new/getAll", { withCredentials: true });
                setNews(data.news);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchNews();
    }, []);

    const handleDeleteNews = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/new/${id}`, { withCredentials: true });
            setNews(news.filter(item => item._id !== id));
            toast.success("News deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateNews = (id) => {
        navigate(`/update_new/${id}`);
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page">
            <div className="flex flex-col justify-center items-center head_text text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-red-700">News</h1>
            </div>
            <div className="flex items-center justify-between mt-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-8 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/>
                        </svg>
                    </div>
                </div>
                <Link to='/create_new' className='btn btn-primary bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 ml-1 text-white'>
                    Add News
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Caption</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Active</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Create At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {news && news.length > 0 ? (
                            news.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caption}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <img
                                        src={item.image && item.image.url}
                                        alt="hinh"
                                        className="w-12 h-12 object-cover rounded-full img-zoom"
                                    />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.active === "Live" ? "bg-green-100 text-green-800" : item.active === "Not Live" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                                            {item.active}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.createAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <button onClick={() => handleUpdateNews(item._id)} className="text-blue-600 hover:text-blue-800">
                                            Update
                                        </button>
                                        
                                        <button onClick={() => handleDeleteNews(item._id)} className="ml-2 text-red-600 hover:text-red-800">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center">No News Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default New;
