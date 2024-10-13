import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateNew = () => {
    const [formData, setFormData] = useState({
        caption: "",
        title: "",
        desc: "",
        active: "Live",
    });
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const { caption, title, desc, active } = formData;

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setImageFile(file);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!imageFile) {
                alert("Please select an image file.");
                return;
            }
    
            const formDataToSend = new FormData();
            formDataToSend.append("caption", caption);
            formDataToSend.append("title", title);
            formDataToSend.append("desc", desc);
            formDataToSend.append("active", active);
            formDataToSend.append("image", imageFile);
    
            await axios.post("http://localhost:4000/api/new/create", formDataToSend, { withCredentials: true });
            alert("News Created Successfully!");
            setFormData({
                caption: "",
                title: "",
                desc: "",
                active: "Live",
            });
            setImageFile(null);
            navigate("/new");
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-8 bg-gray-50 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="caption" className="block font-medium">
                        Caption(Caption must be at most 30 characters long):</label>
                    <input type="text" id="caption" name="caption" value={caption} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full bg-gray-400 text-black" />
                </div>
                <div>
                    <label htmlFor="title" className="block font-medium">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full bg-gray-400 text-black" />
                </div>
                <div>
                    <label htmlFor="desc" className="block font-medium">Description:</label>
                    <textarea id="desc" name="desc" value={desc} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full h-32 bg-gray-400 text-black"></textarea>
                </div>
                <div>
                    <label htmlFor="image" className="block font-medium">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleChange} className="mt-1 p-2 border rounded-md w-full bg-gray-400 text-black" />
                </div>
                <div>
                    <label htmlFor="active" className="block font-medium">Active:</label>
                    <select id="active" name="active" value={active} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full bg-gray-400 text-black">
                        <option value="Live">Live</option>
                        <option value="Not Live">Not Live</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600">Create News</button>
            </form>
        </div>
    );
};

export default CreateNew;
