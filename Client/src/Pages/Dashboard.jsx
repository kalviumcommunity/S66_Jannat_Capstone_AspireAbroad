import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import globe from '../assets/Globe.webp';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const [userDetail, setUserDetails] = useState(null); // Initialize as null to handle loading state better
    const [appointment, setAppointment] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const [error, setError] = useState(null); // New error state

    const id = localStorage.getItem('userID');
    const token = localStorage.getItem('Token');

    const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:0710/getUser/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                // If response is not OK, try to read error message from body
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data)
            setUserDetails(data);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`http://localhost:0710/appointment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAppointment(data.appointments || []);
        } catch (err) {
            console.error('Error fetching appointments:', err);
           
            setAppointment([]);
        }
    };

    useEffect(() => {
        if (id && token) { 
            fetchUserData();
            fetchAppointments();
        } else {
            setLoading(false);
            setError("User ID or Token not found. Please log in.");
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [id, token, navigate]); // Add navigate to dependency array

    const userSteps = userDetail?.steps || [];
    const completedStepsCount = userSteps.filter(step => step.completed).length;
    const totalStepsCount = userSteps.length;
    const progressPercentage = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;

    // Determine the current active step for the progress bar text
    const firstPendingStep = userSteps.find(step => !step.completed);
    const currentStatusText = firstPendingStep ? firstPendingStep.title : 'All steps completed!';

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
    <div className="big-arc-plane text-6xl">✈️</div>
  </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-red-700">
                <p className="text-xl">Error: {error}</p>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-4 px-6 py-2 bg-[#B52721] text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // Ensure userDetail exists before rendering the rest
    if (!userDetail) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-700">No user data available. Please log in.</p>
            </div>
        );
    }


    return (
        <div className="relative min-h-screen">

            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${globe})`, backgroundPosition: '50% 9%' }}
            ></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <MainNav />
                <main className="flex-grow p-8 mt-15">
                    <div className='flex flex-col md:flex-row justify-between bg-white w-full shadow-lg rounded-xl p-6 mb-8 border-l-4 border-[#B52721]'>
                        <div className="backdrop-blur-md">
                            <h2 className="text-4xl font-bold text-[#003366]">Visa Tracker</h2>
                            <p className="text-gray-700">Stay updated with every step of your visa process.</p>
                            <p className="mt-2 text-lg font-semibold text-[#B52721]">Current Status: {currentStatusText}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-600 mr-2">Progress: {progressPercentage}%</span>
                                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-[#B52721] h-2.5 rounded-full"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
                        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg"
                                    alt="Avatar"
                                    className="w-24 h-24 rounded-full border-4 border-[#B52721] mb-4"
                                />
                                <h2 className="text-xl font-bold text-[#003366]">{userDetail.firstname} {userDetail.lastname}</h2>
                                <p className="text-sm text-gray-500">{userDetail.email}</p>
                                <p className="text-sm text-gray-500">{userDetail.phonenumber}</p> {/* Corrected property name */}
                            </div>

                            <div className='text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100 mt-10 w-full'>
                                <h2 className="font-bold text-xl mb-2 text-[#003366]">Appointment Summary:</h2>
                                {appointment.length > 0 ? (
                                    appointment.map((i, idx) => (
                                        <div key={i._id || idx} className="mb-4 last:mb-0 p-3 bg-white rounded shadow-sm border border-blue-200">
                                            <ul className="list-disc ml-5 space-y-1">
                                                <li><strong>Service:</strong> {i.service}</li>
                                                <li><strong>Country:</strong> {i.country}</li>
                                                <li><strong>Date:</strong> {new Date(i.date).toDateString()}</li>
                                                <li><strong>Time:</strong> {i.time}</li>
                                                <li><strong>Mode:</strong> {i.consultationMode}</li>
                                                <li><strong>Status:</strong> <span className={`font-semibold ${
                                                    i.status === 'confirmed' ? 'text-green-600' :
                                                    i.status === 'pending' ? 'text-yellow-600' :
                                                    i.status === 'completed' ? 'text-blue-600' :
                                                    'text-red-600'
                                                }`}>
                                                    {i.status.charAt(0).toUpperCase() + i.status.slice(1)}
                                                </span></li>
                                            </ul>
                                            <h2 className='mt-2 font-bold text-[#B52721]'>We will contact you soon, Stay Tuned</h2>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500">You haven't booked any appointments yet</p>
                                        <button
                                            onClick={() => navigate('/appointment')}
                                            className="mt-2 px-4 py-2 bg-[#B52721] text-white rounded hover:bg-red-600 cursor-pointer"
                                        >
                                            Book Your First Appointment
                                        </button>
                                    </div>
                                )}
                            </div>


                        </div>

                        <div className="lg:col-span-3 space-y-6">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <InfoCard title="Country" value={userDetail.countryresidence} />
                                <InfoCard title="Destination" value={userDetail.destination} />
                                <InfoCard title="Visa Type" value={userDetail.visaType} />
                                <InfoCard title="Application ID" value={userDetail._id.substring(0, 8)} /> {/* Using part of user ID as app ID */}
                                <InfoCard title="Status" value={currentStatusText} status /> {/* Reflect current step status */}
                                <InfoCard title="Last Updated" value={userDetail.updatedAt ? new Date(userDetail.updatedAt).toLocaleString() : 'N/A'} />
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-xl font-semibold text-[#003366] mb-4">Application Timeline</h3>
                                <ol className="relative border-l border-blue-200">
                                    {userSteps.length > 0 ? (
                                        userSteps.map((step, index) => (
                                            <li key={step.title} className="mb-6 ml-6">
                                                <div
                                                    className={`absolute w-4 h-4 rounded-full -left-2.5 top-1 ${
                                                        step.completed ? 'bg-[#B52721]' : 'bg-gray-300'
                                                    }`}
                                                ></div>
                                                <h4
                                                    className={`font-semibold ${
                                                        step.completed ? 'text-[#B52721] line-through' : 'text-gray-500'
                                                    }`}
                                                >
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">{step.comment}</p>
                                                {step.completed && step.completedAt && (
                                                    <p className="text-xs text-green-600 mt-1 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        Completed on {new Date(step.completedAt).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-600 italic">No application steps available.</p>
                                    )}
                                </ol>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

const InfoCard = ({ title, value, status }) => (
    <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-[#B52721]">
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <p className="text-lg font-bold text-[#003366] mt-1">
            {status ? (
                <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    {value}
                </span>
            ) : (
                value
            )}
        </p>
    </div>
);

export default Dashboard;