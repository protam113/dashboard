import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../..';

const Document = () => {
    const [documents, setDocuments] = useState([]);
    const { isAuthenticated } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/document/getAll", { withCredentials: true });
                setDocuments(data.data); // assuming the data returned from the API contains a key named "data" which holds the documents array
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchDocuments();
    }, []);

    const handleDeleteDocument = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/document/delete/${id}`, { withCredentials: true });
            setDocuments(documents.filter(item => item._id !== id));
            toast.success("Document deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateDocument = (id) => {
        navigate(`/update_document/${id}`);
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page">
            <div className="flex flex-col justify-center items-center head_text text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-red-700">Documents</h1>
            </div>
            <div className="flex items-center justify-between mt-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-8 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/>
                        </svg>
                    </div>
                </div>
                <Link to='/create_document' className='btn btn-primary bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 ml-1 text-white'>
                    Add Document
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Caption</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Intro</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Published</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents && documents.length > 0 ? (
                            documents.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caption}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.intro}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <img
                                            src={item.image && item.image.url}
                                            alt=''
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {item.published ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Not Published
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <button onClick={() => handleUpdateDocument(item._id)} className="text-blue-600 hover:text-blue-800">
                                            Update
                                        </button>
                                        <button onClick={() => handleDeleteDocument(item._id)} className="ml-2 text-red-600 hover:text-red-800">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center">No Documents Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Document
