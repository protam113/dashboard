import React, { useContext, useState } from 'react'
import Logo from "../../assets/img/logo.png"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await axios
        .post(
        "http://localhost:4000/api/user/login",
        { email, password, confirmPassword, role: "Admin" },
        {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        }
        )
        .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(true);
            navigateTo("/");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        });
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

if (isAuthenticated) {
    return <Navigate to={"/"} />;
}

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <img src={Logo} alt="Logo" className="w-20 mx-auto mb-8" />
                <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
                <form
                    onSubmit={handleLogin}
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Comfirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none">Login</button>
                    </div>
                    <div>
                        <p>Not Registered?</p>
                        <Link to={"/register"} className='btn btn-primary text-blue-700'>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Login
