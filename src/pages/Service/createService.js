import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateService = () => {
    const [caption, setCaption] = useState("");
    const [intro, setIntro] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("intro", intro);
            formData.append("description", description);
            formData.append("title", title);
            formData.append("link", link);
            formData.append("image", image);

            const response = await axios.post(
                "http://localhost:4000/api/service",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (response.data.success) {
                navigateTo("/service");
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error creating service:", error);
            setErrorMessage("An error occurred while creating the service.");
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <div className='justify-center items-center content-center'>
                <div className='flex items-center justify-center'>
                    <p class="text-4xl text-gray-900 font-bold">Create Service</p>
                </div>  
            </div>
            <div className='container'>
                {errorMessage && (
                    <div className="text-red-600 mb-4">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="caption">
                        Caption :</label>
                        <input 
                            type="text" 
                            id="caption" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            placeholder="Write Caption!" 
                            required
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)} 
                        />
                    </div>
                    {/* Bổ sung phần chọn hình ảnh */}
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="image">
                        Image :</label>
                        <input 
                            type="file" 
                            id="image" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    {/* Kết thúc phần chọn hình ảnh */}
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="intro">
                        Intro(intro must contain at max 10 characters!) :</label>
                        <input 
                            type="text" 
                            id="intro" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            placeholder="Write Intro!" 
                            required
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="description">Description :</label>
                        <input 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            id="description" 
                            type="text"
                            placeholder="Write Description!"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-600" htmlFor="title">Title :</label>
                        <input 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            id="title" 
                            type="text"
                            placeholder="Write Title!"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-600" htmlFor="link">Link :</label>
                        <input 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            id="link" 
                            type="text"
                            placeholder="Write Link!"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-between mt-8'>
                        <Link 
                            to='/service'
                            className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 ml-2"
                        >
                            Back To Service
                        </Link>
                        <button 
                            className='bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 ml-2'
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateService;

