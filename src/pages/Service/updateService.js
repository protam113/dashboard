import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { toast } from 'react-toastify';

const UpdateService = () => {
    const { isAuthenticated } = useContext(Context);
    const { id } = useParams();
    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        caption: '',
        intro: '',
        description: '',
        title: '',
        link: '',
        image: '',
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/service/${id}`);
                const serviceData = response.data.data;
                setFormData(serviceData);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchService();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({
                ...formData,
                image: e.target.files[0], // Lưu file hình ảnh vào state image
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
            await axios.put(`http://localhost:4000/api/service/update/${id}`, formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Service updated successfully');
            navigateTo('/service');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-semibold mb-6">Update Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
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
                    <label htmlFor="intro" className="block text-sm font-medium text-gray-700">Introduction</label>
                    <textarea
                        name="intro"
                        id="intro"
                        value={formData.intro}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                    <input
                        type="text"
                        name="link"
                        id="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Update Service
                </button>
            </form>
        </div>
    );
};

export default UpdateService;

