import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from "axios";
import { Context } from '../..';
import { toast } from 'react-toastify';

const Product = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState([]);
    const { isAuthenticated } = useContext(Context);
    const navigate = useNavigate(); // Sử dụng useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/product/getall_product",
                    { withCredentials: true }
                );
                setProducts(data.products);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchProducts();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/product/delete/${id}`,
                { withCredentials: true }
            );
            setProducts(products.filter(product => product._id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update_product/${id}`);
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Product List</h1>
                <Link style={{textDecoration:'none'}} to='/create_product' className='btn btn-primary bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 ml-1 text-white'>
                    Add Product
                </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map(product => (
                        <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><img
                                    src={product.image && product.image.url}
                                    alt=''
                                    className="w-12 h-12 object-cover rounded-full"
                                /></td>
                            <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleUpdate(product._id)} className="text-blue-500 hover:text-blue-700 mr-2">Update</button>
                                <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;
