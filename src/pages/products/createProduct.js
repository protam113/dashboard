import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [productName, setProductName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("title", title);
            formData.append("desc", desc);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("image", image);

            await axios.post(
                "http://localhost:4000/api/product/create",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            navigateTo("/product");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <div className='justify-center items-center content-center'>
                <div className='flex items-center justify-center'>
                    <p class="text-4xl text-gray-900 font-bold">Create Product</p>
                </div>  
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="productName">
                        Product Name(Product Name Must Contain At Least 3 Characters!) :</label>
                        <input 
                            type="text" 
                            id="productName" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            placeholder="Write ProductName!" 
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)} 
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
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="title">
                        Title(Title Must Contain At Least 5 Characters!) :</label>
                        <input 
                            type="text" 
                            id="title" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            placeholder="Write Title!" 
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="desc">
                        Description(Description Must Contain At Least 10 Characters!) :</label>
                        <input 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            id="desc" 
                            type="text"
                            placeholder="Write Description!"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-600" htmlFor="price">
                        Price(Price Must Be Non-Negative!) :</label>
                        <input 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            id="price" 
                            type="number"
                            placeholder="Write Price!"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-600" htmlFor="stock">
                        Stock(Stock Must Be Non-Negative!) :</label>
                        <input 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5  bg-gray-300  border-gray-300 placeholder-gray-400" 
                            id="stock" 
                            type="number"
                            placeholder="Write Stock!"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <Link 
                            to='/product'
                            className="bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-white"
                        >
                            Back To Product
                        </Link>
                        <div className="relative">
                            <button 
                                className='btn btn-primary bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-white'
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>  
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
