import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/Axios';
import { FcGoogle } from 'react-icons/fc';
import { FaUserShield } from 'react-icons/fa';
import right from '../assets/right.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await API.post('/user/login', { email, password });
            login(res.data.token, res.data.admin);
            navigate('/dashboard');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Login failed. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8">
                    <div className="text-center">
                        <div className="text-blue-600 text-3xl flex justify-center mb-4">
                            <FaUserShield />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">ADMIN</h2>
                        <p className="text-gray-500 text-sm mt-1">Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        {/* Email */}
                        <div className="relative w-full">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                                className="peer w-full appearance-none rounded-lg border border-gray-400 bg-white px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-400"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-2 top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-1 text-sm text-gray-500 transition-all duration-200
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
    peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4"
                            >
                                Email
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative w-full mt-4">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                                className="peer w-full appearance-none rounded-lg border border-gray-400 bg-white px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-400"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-2 top-1/2 z-10 origin-[0] -translate-y-1/2 scale-100 transform bg-white px-1 text-sm text-gray-500 transition-all duration-200
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
    peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4"
                            >
                                Password
                            </label>
                        </div>


                        {error && <div className="text-sm text-red-600 font-medium">{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={right}
                        alt="Login Visual"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
