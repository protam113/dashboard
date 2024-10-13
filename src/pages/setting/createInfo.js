import React, { useState,useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../..';

const CreateInfoPage = () => {
    const { isAuthenticated } = useContext(Context);

    const [mainTitle, setMainTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [title, setTitle] = useState("");
    const [slogan, setSlogan] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [map, setMap] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [link, setLink] = useState("");

    const navigateTo = useNavigate();

    const handleAddNewInfo = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('mainTitle', mainTitle);
        formData.append('intro', intro);
        formData.append('title', title);
        formData.append('slogan', slogan);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('map', map);
        formData.append('mainImage', mainImage);
        formData.append('link', link);

        try {
            const res = await axios.post('http://localhost:4000/api/info/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            toast.success(res.data.message || 'Info created successfully!');
            navigateTo('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while creating the info.');
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    return (
        <section className="page bg-gray-100">
            <section className="container mx-auto max-w-xl p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create New Info</h1>
                <form onSubmit={handleAddNewInfo}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Main Title(mainTitle Must Contain At least 5 Characters!)
                            </label>
                            <input
                                type="text"
                                placeholder="Main Title"
                                value={mainTitle}
                                onChange={(e) => setMainTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="mainTitle"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Intro(Intro must contain at least 10 characters!)
                            </label>
                            <textarea
                                placeholder="Introduction"
                                value={intro}
                                onChange={(e) => setIntro(e.target.value)}
                                wrap="soft"
                                rows="4"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="intro"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Title(title Must Contain At Least 20 Characters!)
                            </label>    
                            <textarea
                                type="text"
                                placeholder="Title"
                                wrap="soft"
                                value={title}
                                rows="4"
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="title"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Slogan(slogan Must Contain At Least 10 Characters!)
                            </label>
                            <input
                                type="text"
                                placeholder="Slogan"
                                value={slogan}
                                onChange={(e) => setSlogan(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="slogan"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="address"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="phone"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Map
                            </label>
                            <input
                                type="text"
                                placeholder="Map"
                                value={map}
                                onChange={(e) => setMap(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="map"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Caption(Doc intro must contain at max 20 characters!)
                            </label>
                            <input
                                type="text"
                                placeholder="Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="link"
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                                Main Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setMainImage(e.target.files[0])}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="mainImage"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600">Create Info</button>
                </form>
            </section>
        </section>
    );
};

export default CreateInfoPage;
