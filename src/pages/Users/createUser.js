import React, { useContext, useState } from 'react'
import { Context } from '../..';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import logo from "../../assets/img/logo.png";

const CreateUser = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleAddNewUser = async (e) => {
        e.preventDefault();
        try {
            await axios
            .post(
                "http://localhost:4000/api/user/register",
                { username, email, phone, dob, password },
                {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
                }
            )
            .then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(true);
                navigateTo("/");
                setUsername("");
                setEmail("");
                setPhone("");
                setDob("");
                setPassword("");
            });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
        if (!isAuthenticated) {
            return <Navigate to={"/login"} />;
        }
    
        return (
            <section className="page bg-gray-100">
                <section className="container mx-auto max-w-xl p-8 bg-white shadow-md rounded-lg">
                    <img src={logo} alt="logo" className="mx-auto mb-8" />
                    <h1 className="text-2xl font-bold text-center mb-6">REGISTER A NEW USER</h1>
                    <form onSubmit={handleAddNewUser}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <input
                                    type="text"
                                    placeholder="User Name"
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                    name="username"
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                    name="email"
                                />
                                <input
                                    type="number"
                                    placeholder="Mobile Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                    name="phone"
                                />
                                <input
                                type={"date"}
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                name="dob"
                            />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
                                    name="password"
                                />
                                <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600">Register New Manager</button>
                            </div>
                        </div>
                    </form>
                </section>
            </section>
        );
    };

export default CreateUser
