import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../..';

const CreateDocument = () => {
    
    const { isAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        caption: '',
        intro: '',
        paraOneDescription: '',
        paraOneTitle: '',
        paraTwoDescription: '',
        paraTwoTitle: '',
        link: '',
        image: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            axios.post('http://localhost:4000/api/document', formDataToSend, {
                 withCredentials: true, // Đảm bảo rằng cookies được bao gồm trong yêu cầu
                headers: {
                'Content-Type': 'multipart/form-data',
                    },
            });
            toast.success('Document created successfully');
            navigateTo('/document'); // Chuyển hướng đến trang chính sau khi tạo thành công
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-semibold mb-6">Create New Document</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                        Caption(Doc intro must contain at max 20 characters!)
                    </label>
                    <input
                        type="text"
                        name="caption"
                        id="caption"
                        value={formData.caption}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="intro" className="block text-sm font-medium text-gray-700">
                        Introduction(Doc intro must contain at least 10 characters!)
                    </label>
                    <textarea
                        name="intro"
                        id="intro"
                        value={formData.intro}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="paraOneTitle" className="block text-sm font-medium text-gray-700">
                        Para One Title
                    </label>
                    <input
                        type="text"
                        name="paraOneTitle"
                        id="paraOneTitle"
                        value={formData.paraOneTitle}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="paraOneDescription" className="block text-sm font-medium text-gray-700">
                        Para One Description
                    </label>
                    <textarea
                        name="paraOneDescription"
                        id="paraOneDescription"
                        value={formData.paraOneDescription}
                        onChange={handleChange}
                        rows="4" // Đặt số hàng mong muốn (có thể thay đổi tùy theo nhu cầu)
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="paraTwoTitle" className="block text-sm font-medium text-gray-700">
                        Para Two Title
                    </label>
                    <input
                        type="text"
                        name="paraTwoTitle"
                        id="paraTwoTitle"
                        value={formData.paraTwoTitle}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="paraTwoDescription" className="block text-sm font-medium text-gray-700">
                        Para Two Description
                    </label>
                    <textarea
                        name="paraTwoDescription"
                        id="paraTwoDescription"
                        value={formData.paraTwoDescription}
                        onChange={handleChange}
                        rows="4" // Đặt số hàng mong muốn (có thể thay đổi tùy theo nhu cầu)
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                        Link
                    </label>
                    <input
                        type="text"
                        name="link"
                        id="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Create Document
                </button>
            </form>
        </div>
    );
};

export default CreateDocument;
