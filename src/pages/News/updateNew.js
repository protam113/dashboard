import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateNews = () => {
    const { id } = useParams();
    const navigateTo = useNavigate();

    const [news, setNews] = useState({
        caption: "",
        title: "",
        desc: "",
        image: "",
        active: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/new/${id}`, { withCredentials: true });
                const newsData = response.data.news;
                setNews(newsData);
            } catch (error) {
                console.error("Error fetching news:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("caption", news.caption);
            formData.append("title", news.title);
            formData.append("desc", news.desc);
            formData.append("image", news.image); // Đổi thành file
            formData.append("active", news.active);

            await axios.put(
                `http://localhost:4000/api/new/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            navigateTo("/new");
        } catch (error) {
            console.error("Error updating news:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNews(prevNews => ({
            ...prevNews,
            [name]: value
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-8xl mx-auto mt-4 bg-gray-50 p-2 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update News</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                <div className="col-span-1">
                    <label htmlFor="caption" className="block font-medium">Caption:</label>
                    <input type="text" id="caption" name="caption" value={news.caption} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full bg-gray-200" />
                </div>
                <div className="col-span-1">
                    <label htmlFor="title" className="block font-medium">Title:</label>
                    <input type="text" id="title" name="title" value={news.title} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full bg-gray-200" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="desc" className="block font-medium">Description:</label>
                    <textarea id="desc" name="desc" value={news.desc} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full h-32 bg-gray-200"></textarea>
                </div>
                <div className="col-span-1">
                    <label htmlFor="image" className="block font-medium">Image File:</label>
                    <input type="file" id="image" name="image" onChange={(e) => setNews(prevNews => ({ ...prevNews, image: e.target.files[0] }))} className="mt-1 p-2 border rounded-md w-full bg-gray-200" />
                </div>
                <div className="col-span-1">
                    <label htmlFor="active" className="block font-medium">Active:</label>
                    <select
                        id="active"
                        name="active"
                        value={news.active}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full bg-gray-200"
                    >
                        <option value="Live">Live</option>
                        <option value="Not Live">Not Live</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <button type="submit" className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update News</button>
            </form>
        </div>
    );
};

export default UpdateNews;
