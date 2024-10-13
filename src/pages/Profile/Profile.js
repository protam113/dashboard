import React, { useContext, useEffect, useState } from 'react';
import Admin from "../../assets/img/logo.png";
import { Context } from '../..';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const [admins, setAdmins] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const { isAuthenticated, admin } = useContext(Context);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/user/admin/getall",
                    { withCredentials: true }
                );
                setAdmins(data.Admins); // Lưu ý rằng dữ liệu được trả về từ endpoint là data.Admins, không phải data.users
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchAdmins();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                {/* Phần thông tin admin */}
                <div className="firstBox flex items-center bg-white p-4 rounded-lg shadow-md">
                    <img src={Admin} alt="adminIMG" className="w-16 h-16 rounded-full mr-4" />
                    <div className="content">
                        <div>
                            <p className="text-gray-600">Hello ,</p>
                            <h5 className="text-xl font-semibold">
                                {admin && `${admin.username}`}
                            </h5>
                        </div>
                        <p className="text-gray-600">
                            Chúng tôi luôn lấy khách hàng làm trọng tâm và phục vụ khách hàng là yếu tố mang đến sự thành công.
                        </p>
                    </div>
                </div>
                {/* Phần thông tin thống kê */}
                <div className="secondBox bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <p className="text-gray-600">Total Appointments</p>
                    <h3 className="text-2xl font-bold">1500</h3>
                </div>
                <div className="thirdBox bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <p className="text-gray-600">Registered Manager</p>
                    <h3 className="text-2xl font-bold">10</h3>
                </div>
                {/* Nút thêm admin */}
                <div className="thirdBox bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <Link to={"/create_admin"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Admin
                    </Link>
                </div>
            </div>
            {/* Bảng hiển thị danh sách admin */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">STT</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">DOB</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins && admins.length > 0 ? (
                            admins.map((admin, index) => (
                                <tr key={index}>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.username}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.email}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.phone}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.dob.substring(0, 10)}</td>
                                    <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {/* Thêm các actions tương ứng */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center">No Registered Managers Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Profile;
