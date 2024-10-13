import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigateTo = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        title: "",
        desc: "",
        price: "",
        stock: "",
        image: null // Thêm trường image vào state
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/product/getall_product/${id}`);
                const productData = response.data.product;
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct(prevProduct => ({
            ...prevProduct,
            image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('productName', product.productName);
            formData.append('title', product.title);
            formData.append('desc', product.desc);
            formData.append('price', product.price);
            formData.append('stock', product.stock);
            formData.append('image', product.image);

            await axios.put(
                `http://localhost:4000/api/product/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            navigateTo("/product");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    return (
        <div>
            <div className='justify-center items-center content-center'>
                <div className='flex items-center justify-center'>
                    <p className="text-4xl text-gray-900 font-bold">Update Product</p>
                </div>  
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="productName">Product Name :</label>
                        <input 
                            type="text" 
                            id="productName" 
                            name="productName" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5 bg-gray-300 border-gray-300 placeholder-gray-400" 
                            placeholder="Write ProductName!" 
                            required
                            value={product.productName}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="title">Title :</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5 bg-gray-300 border-gray-300 placeholder-gray-400" 
                            placeholder="Write Title!" 
                            required
                            value={product.title}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="desc">Description :</label>
                        <input 
                            type="text" 
                            id="desc" 
                            name="desc" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5 bg-gray-300 border-gray-300 placeholder-gray-400" 
                            placeholder="Write Description!" 
                            required
                            value={product.desc}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="price">Price :</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5 bg-gray-300 border-gray-300 placeholder-gray-400" 
                            placeholder="Enter Price!" 
                            required
                            value={product.price}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="stock">Stock :</label>
                        <input 
                            type="number" 
                            id="stock" 
                            name="stock" 
                            className="text-gray-600 text-sm rounded-lgfocus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5 bg-gray-300 border-gray-300 placeholder-gray-400" 
                            placeholder="Enter Stock!" 
                            required
                            value={product.stock}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-4 text-sm font-medium text-gray-900" htmlFor="image">Image :</label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image" 
                            className="text-gray-600 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full ps-10 p-2.5 bg-gray-300 border-gray-300 placeholder-gray-400" 
                            required
                            onChange={handleImageChange} 
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

export default UpdateProduct;

