import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../..';

const UpdateInfo = () => {
    const { isAuthenticated } = useContext(Context);
    const { id } = useParams();
    const navigateTo = useNavigate();
    const [info, setInfo] = useState({
        mainTitle: '',
        intro: '',
        title: '',
        slogan: '',
        address: '',
        phone: '',
        email: '',
        map: '',
        link: '',
        mainImage: null,
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/info/${id}`);
                setInfo(response.data);
            } catch (error) {
                console.error('Error fetching info:', error);
            }
        };
        fetchInfo();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setInfo({
                ...info,
                image: e.target.files[0], // Lưu file hình ảnh vào state image
            });
        } else {
            setInfo({
                ...info,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            const newValue =
                value.substring(0, selectionStart) +
                '\n' +
                value.substring(selectionEnd);
    
            setInfo({
                ...info,
                [e.target.name]: newValue,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in info) {
                formDataToSend.append(key, info[key]);
            }
            await axios.put(`http://localhost:4000/api/info/update/${id}`, formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('info updated successfully');
            navigateTo('/setting');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-4">Update Information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-gray-700">Main Title</label>
                            <input
                                type="text"
                                name="mainTitle"
                                value={info.mainTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Intro</label>
                            <textarea
                                name="intro"
                                value={info.intro}
                                rows={4}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Title</label>
                            <textarea
                                type="text"
                                name="title"
                                wrap="soft"
                                rows={4}
                                onKeyDown={handleKeyDown}
                                value={info.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Slogan</label>
                            <input
                                type="text"
                                name="slogan"
                                value={info.slogan}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={info.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={info.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={info.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Map</label>
                            <input
                                type="text"
                                name="map"
                                value={info.map}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Link</label>
                            <input
                                type="text"
                                name="link"
                                value={info.link}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Main Image</label>
                            <input
                                type="file"
                                name="mainImage"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
                        >
                            Update Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInfo;
