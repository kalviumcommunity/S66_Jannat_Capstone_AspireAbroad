import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useEffect } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainNav from '../components/MainNav'; 
import enroll from "../assets/enroll.jpg"; 
import Footer from '../components/Footer';

const Enroll = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const [input, setInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        countryresidence: '',
        destination: '',
        visaType: '',
        password: '',
        termsAccepted: false,
    });
    const validDestinations = ['Australia', 'Canada', 'UK', 'USA']; 
    const validVisaTypes = ['Tourist Visa', 'Study Visa', 'Work Visa', 'Permanent Residence'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInput({
            ...input,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.firstname || !input.lastname || !input.email || !input.phonenumber || !input.countryresidence || !input.destination || !input.visaType || !input.password) {
            toast.error('All fields are required!');
            return;
        }

        const phoneRegex=/^\d{10}$/;
        if(!phoneRegex.test(input.phonenumber)){
            toast.error('Phone number must be 10 digits')
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(input.email)){
            toast.error('Please enter a valid email')
        }

        
        if (!validDestinations.includes(input.destination)) {
            toast.error('Please select a valid destination');
            return;
        }
        
        if (!validVisaTypes.includes(input.visaType)) {
            toast.error('Please select a valid visa type');
            return;
        }

        if (!input.termsAccepted) {
            toast.error('You must agree to the terms and conditions');
            return;
        }

        try {
            const response = await fetch('https://jannat-aspireabroad.onrender.com/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });

            const data = await response.json();
            console.log(data.newUser)

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed!');
            }else{

            toast.success('Signup Successful! 🎉');
            setInput({
                firstname: '',
                lastname: '',
                email: '',
                phonenumber: '',
                countryresidence: '',
                destination: '',
                visaType: '',
                password: '',
                termsAccepted: false,
            });

            
            setTimeout(() => {
                navigate('/stepIn');
            }, 3000);
        }

        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            

            <div className='flex flex-col justify-center items-center min-h-screen w-full'>
            <MainNav/>
          
                <h2 className='text-4xl font-bold text-[#003366] mt-25 mb-6 text-center '>
                    Start Your Journey With Us Now
                </h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mb-8 h-150'
                >
               
                    <div className='hidden lg:block w-1/2 h-full'>
                        <img
                            src={enroll}
                            alt="Enroll"
                            className='w-full h-full object-cover '
                        />
                    </div>

      
                    <div className='w-full lg:w-1/2 p-4 '>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder='First Name'
                                        onChange={handleInputChange}
                                        className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full'
                                        value={input.firstname}
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder='Last Name'
                                        onChange={handleInputChange}
                                        className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full'
                                        value={input.lastname}
                                        required
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    onChange={handleInputChange}
                                    className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full'
                                    value={input.email}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <input
                                    type="tel"
                                    name="phonenumber"
                                    placeholder='Phone Number'
                                    onChange={handleInputChange}
                                    className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full'
                                    value={input.phonenumber}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <input
                                    type="text"
                                    name="countryresidence"
                                    placeholder='Country of Residence'
                                    onChange={handleInputChange}
                                    className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full'
                                    value={input.countryresidence}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                   <select
                                    name="destination"
                                    onChange={handleInputChange}
                                    value={input.destination}
                                    className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full text-gray-500'
                                    required
                                >
                                    <option value="">Select Destination</option>
                                    {validDestinations.map((destination) => (
                                        <option key={destination} value={destination}>
                                            {destination}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <select
                                    name="visaType"
                                    onChange={handleInputChange}
                                    value={input.visaType}
                                    className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full text-gray-500'
                                    required
                                >
                                    <option value="">Select VisaType</option>
                                    {validVisaTypes.map((visa) => (
                                        <option  key={visa} value={visa}>
                                            {visa}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    onChange={handleInputChange}
                                    className='p-3 bg-gray-100 focus:outline-none rounded-lg w-full'
                                    value={input.password}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className='flex items-center'
                            >
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    onChange={handleInputChange}
                                    checked={input.termsAccepted}
                                    className='mr-3'
                                    required
                                />
                                <label className='text-sm text-gray-700'>
                                    I agree to the terms and conditions
                                </label>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                            >
                                <button
                                    type="submit"
                                    className='bg-[#B52721] text-white p-3 w-full rounded-lg hover:bg-[#003366] transition duration-300 cursor-pointer'
                                >
                                    Submit
                                </button>
                            </motion.div>
                        </form>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className='mt-4 text-center'
                        >
                            <p className='text-sm text-gray-700'>
                                Already have an account?{' '}
                                <a href="/stepIn" className='text-[#B52721] underline'>
                                    StepIn
                                </a>
                            </p>
                        </motion.div>
                    </div>
                    
                </motion.div>
                
                <ToastContainer position="top-right" style={{ top: '70px' }} autoClose={3000} />
                
                <Footer className="w-full" />
            </div>
            
        </>
    );
};

export default Enroll;