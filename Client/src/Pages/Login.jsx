import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainNav from '../components/MainNav';
import stepIn from "../assets/stepIn.jpg"; 
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.firstname || !input.lastname || !input.email || !input.password) {
            toast.error('All fields are required!');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            toast.error('Please enter a valid email!');
            return;
        }
        try {
            const response = await fetch('http://localhost:0710/stepIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials:"include",
                body: JSON.stringify(input),
            });
            const data = await response.json();
            if (data.token) localStorage.setItem("Token", data.token);
            if (data.userID) localStorage.setItem("userID", data.userID);
            if (!response.ok) throw new Error(data.message || 'Signup failed!');
            toast.success('Access Granted! Enjoy Your Experience.🎉');
            setInput({ firstname: '', lastname: '', email: '', password: '' });
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            toast.error(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <MainNav />
            <h2 className='text-4xl font-bold text-[#003366] mt-25 mb-6 text-center '>
            Welcome Back! StepIn to Continue
                </h2>

            {/* Centered Container */}
            <div className="flex justify-center items-center h-150 px-4 ">
            

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col-reverse lg:flex-row  w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mb-8 mt-7"
                >
                    {/* Form Section */}
                    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                    <motion.div 
    initial={{ opacity: 0, y: -10 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ delay: 0.1 }} 
    className="text-center mb-6"
>
    <h3 className="text-2xl font-semibold text-[#003366] relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#B52721]">
        Enter your details to continue
    </h3>
</motion.div>

                    
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    onChange={handleInputChange}
                                    className="p-3 bg-gray-100 focus:outline-none rounded-lg w-full"
                                    value={input.firstname}
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                    className="p-3 bg-gray-100 focus:outline-none rounded-lg w-full"
                                    value={input.lastname}
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                    className="p-3 bg-gray-100 focus:outline-none rounded-lg w-full"
                                    value={input.email}
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    className="p-3 bg-gray-100 focus:outline-none rounded-lg w-full"
                                    value={input.password}
                                    required
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                <button
                                    type="submit"
                                    className="bg-[#B52721] text-white p-3 w-full rounded-lg hover:bg-[#003366] transition duration-300 cursor-pointer"
                                >
                                    StepIn
                                </button>
                            </motion.div>
                        </form>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-3 text-center">
                            <p className="text-sm text-gray-700">
                                Don't have an account?{' '}
                                <a href="/enroll" className="text-[#B52721] underline ">
                                    Enroll
                                </a>
                            </p>
                        </motion.div>
                    </div>

                    {/* Image Section */}
                    <div className="hidden lg:block h-150 w-2/4">
                        <img src={stepIn} alt="Signup" className="w-full h-full object-cover" />
                    </div>
                </motion.div>
            </div>

            <ToastContainer position="top-right" style={{ top: '70px' }} autoClose={3000} />
            <Footer />
        </>
    );
};

export default Login;
