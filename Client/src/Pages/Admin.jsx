import React, { useState, useEffect } from 'react';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';



// --- Admin Component ---
const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingApptId, setUpdatingApptId] = useState(null);
    const [updatingStepForUser, setUpdatingStepForUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
         
                const response = await fetch('http://localhost:0710/user'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

   
    const handleAppointmentStatusChange = async (userId, appointmentId, newStatus) => {
        if (updatingApptId === appointmentId) return;

        setUpdatingApptId(appointmentId);
        try {
            const response = await fetch(`http://localhost:0710/appointment/${appointmentId}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update appointment status');
            }


            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId
                        ? {
                              ...user,
                              appointments: user.appointments.map((appt) =>
                                  appt._id === appointmentId ? { ...appt, status: newStatus } : appt
                              ),
                          }
                        : user
                )
            );
            console.log(`Appointment ${appointmentId} status updated to ${newStatus}`);
        } catch (err) {
            console.error('Error updating appointment status:', err);
            alert(`Error updating appointment status: ${err.message}`);
        } finally {
            setUpdatingApptId(null);
        }
    };


    const handleStepStatusChange = async (userId, stepTitle, newCompletedStatus) => {
        if (updatingStepForUser === userId) return; 

        setUpdatingStepForUser(userId); 

        try {

            const response = await fetch(`http://localhost:0710/users/${userId}/steps`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: stepTitle, 
                    completed: newCompletedStatus
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update step status');
            }

            const updatedData = await response.json(); 

  
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId
                        ? {
                              ...user,
                              steps: user.steps.map((step) =>
                                  step.title === stepTitle
                                      ? { ...step, completed: newCompletedStatus, completedAt: updatedData.updatedStep.completedAt }
                                      : step
                              ),
                          }
                        : user
                )
            );
            console.log(`User ${userId} step '${stepTitle}' updated to ${newCompletedStatus}`);
        } catch (err) {
            console.error('Error updating step status:', err);
            alert(`Error updating step status: ${err.message}`);
        } finally {
            setUpdatingStepForUser(null); 
        }
    };


    if (loading) return <div className="flex justify-center items-center h-40">
    <div className="big-arc-plane text-6xl">✈️</div>
  </div>;
    if (error) return <div className="text-center text-red-700 p-8 text-xl font-semibold">Error: {error}</div>;

    const appointmentStatusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

    return (
        <>
            <MainNav/>
            <div className="min-h-screen bg-gray-100 py-10 mt-20">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl font-extrabold text-[#003366] text-center mb-12 drop-shadow-md">All Users Data</h2>

                    {users.length === 0 && !loading && !error && (
                        <div className="text-center text-gray-600 text-2xl mt-10">No users found.</div>
                    )}

                    <div className="space-y-12">
                        {users.map((user) => {
                         
                            const sortedSteps = [...(user.steps || [])].sort((a, b) => a.order - b.order);

                            const firstPendingStage = sortedSteps.find(step => !step.completed);
                            const currentStageTitle = firstPendingStage ? firstPendingStage.title : 'All stages completed';

                            return (
                                <div
                                    key={user._id}
                                    className="bg-white border-4 border-black rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                                >
                               
                                    <div className="mb-8 pb-6 border-b-2 border-[#003366]/20">
                                        <h2 className="text-3xl font-bold text-[#003366] mb-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#B52721]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {user.firstname} {user.lastname}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
                                            <p><span className="font-semibold text-[#B52721]">Email:</span> {user.email}</p>
                                            <p><span className="font-semibold text-[#B52721]">Phone:</span> {user.phonenumber}</p>
                                            <p><span className="font-semibold text-[#B52721]">Residence:</span> {user.countryresidence}</p>
                                            <p><span className="font-semibold text-[#B52721]">Destination:</span> {user.destination}</p>
                                            <p><span className="font-semibold text-[#B52721]">Visa Type:</span> {user.visaType}</p>
                                        </div>
                                    </div>

                                 
                                    <div className="mb-8 pb-6 border-b-2 border-[#003366]/20">
                                        <h3 className="text-2xl font-bold text-[#003366] mb-5 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-[#B52721]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Application Progress
                                        </h3>
                                        <p className="mb-4 text-lg">
                                            <span className="font-semibold text-[#B52721]">Current Stage:</span>{' '}
                                            <span className="font-bold text-[#003366]">
                                                {currentStageTitle}
                                            </span>
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {sortedSteps.map((step) => (
                                                <div key={step.title} className="flex items-center">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name={`application-step-${user._id}-${step.title}`}
                                                            checked={step.completed}
                                                            onChange={(e) =>
                                                                handleStepStatusChange(
                                                                    user._id,
                                                                    step.title,
                                                                    e.target.checked
                                                                )
                                                            }
                                                            className="form-checkbox h-5 w-5 text-[#003366] border-gray-300 rounded focus:ring-2 focus:ring-offset-2 focus:ring-[#003366]"
                                                            disabled={updatingStepForUser === user._id}
                                                        />
                                                        <span className={`ml-2 text-base font-medium ${
                                                            step.completed
                                                                ? 'text-green-700 line-through'
                                                                : 'text-gray-500'
                                                        }`}>
                                                            {step.title}
                                                            {step.completed && step.completedAt && (
                                                                <span className="ml-2 text-xs text-gray-500 italic">
                                                                    (Completed: {new Date(step.completedAt).toLocaleDateString()})
                                                                </span>
                                                            )}
                                                        </span>
                                                    </label>
                                                    {updatingStepForUser === user._id && (
                                                        <span className="ml-3 text-gray-500 italic text-sm">Saving...</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                
                                    <div className="mb-8 pb-6 border-b-2 border-[#003366]/20">
                                        <h3 className="text-2xl font-bold text-[#003366] mb-5 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-[#B52721]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Appointments
                                        </h3>
                                        {user.appointments && user.appointments.length > 0 ? (
                                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                {user.appointments.map((appt) => (
                                                    <div
                                                        key={appt._id}
                                                        className="border border-gray-300 rounded-lg p-5 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-shadow duration-200"
                                                    >
                                                        <p className="mb-1"><span className="font-semibold text-[#B52721]">Service:</span> <span className="font-medium text-gray-800">{appt.service}</span></p>
                                                        <p className="mb-1"><span className="font-semibold text-[#B52721]">Country:</span> <span className="font-medium text-gray-800">{appt.country}</span></p>
                                                        <p className="mb-1"><span className="font-semibold text-[#B52721]">Date:</span> <span className="font-medium text-gray-800">{new Date(appt.date).toLocaleDateString()}</span></p>
                                                        <p className="mb-1"><span className="font-semibold text-[#B52721]">Time:</span> <span className="font-medium text-gray-800">{appt.time}</span></p>
                                                        <p className="mb-1"><span className="font-semibold text-[#B52721]">Mode:</span> <span className="font-medium text-gray-800">{appt.consultationMode}</span></p>

                                                        <p className="mb-2">
                                                            <span className="font-semibold text-[#B52721]">Current Status:</span>{' '}
                                                            <span className={`font-bold ${
                                                                appt.status === 'confirmed' ? 'text-green-600' :
                                                                appt.status === 'pending' ? 'text-yellow-600' :
                                                                appt.status === 'completed' ? 'text-blue-600' :
                                                                'text-red-600'
                                                            }`}>
                                                                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                                            </span>
                                                        </p>

                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {updatingApptId === appt._id ? (
                                                                <span className="text-gray-500 italic text-sm">Updating...</span>
                                                            ) : (
                                                                appointmentStatusOptions.map((statusOption) => (
                                                                    <label key={statusOption} className="inline-flex items-center">
                                                                        <input
                                                                            type="radio"
                                                                            name={`status-${appt._id}`}
                                                                            value={statusOption}
                                                                            checked={appt.status === statusOption}
                                                                            onChange={() => handleAppointmentStatusChange(user._id, appt._id, statusOption)}
                                                                            className={`form-radio h-4 w-4 ${
                                                                                statusOption === 'pending' ? 'text-yellow-500' :
                                                                                statusOption === 'confirmed' ? 'text-green-500' :
                                                                                statusOption === 'completed' ? 'text-blue-500' :
                                                                                'text-red-500'
                                                                            } border-gray-300 focus:ring-2 focus:ring-offset-2`}
                                                                            disabled={updatingApptId === appt._id}
                                                                        />
                                                                        <span className={`ml-1 text-sm font-medium ${
                                                                            statusOption === 'pending' ? 'text-yellow-700' :
                                                                            statusOption === 'confirmed' ? 'text-green-700' :
                                                                            statusOption === 'completed' ? 'text-blue-700' :
                                                                            'text-red-700'
                                                                        }`}>
                                                                            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                                                                        </span>
                                                                    </label>
                                                                ))
                                                            )}
                                                        </div>

                                                        {appt.notes && <p className="mt-2 text-sm text-gray-700 italic border-t border-gray-200 pt-2"><span className="font-semibold text-[#B52721]">Notes:</span> {appt.notes}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-600 italic text-lg">No appointments scheduled for this user.</p>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-[#003366] mb-5 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-[#B52721]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Documents
                                        </h3>
                                        {user.documents ? (
                                            <div>
                                                <p className="mb-5 text-lg"><span className="font-semibold text-[#B52721]">Visa Category:</span> <span className="font-medium text-gray-800">{user.documents.visaType}</span></p>
                                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                    {Object.entries(user.documents.documents).map(([docType, docUrl]) => (
                                                        <div
                                                            key={docType}
                                                            className="border border-gray-300 rounded-lg p-5 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center text-center"
                                                        >
                                                            <p className="font-bold text-[#B52721] mb-3 text-lg">{docType.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</p>
                                                            {docUrl.startsWith('http') || docUrl.startsWith('https') ? (
                                                                <div className="mt-2 w-full">
                                                                    <a
                                                                        href={docUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block mb-3 text-[#003366] hover:underline font-semibold text-base"
                                                                    >
                                                                        View Full Document
                                                                    </a>
                                                                    <img
                                                                        src={docUrl}
                                                                        alt={docType}
                                                                        className="max-w-full max-h-56 object-contain border border-gray-300 rounded mx-auto"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <p className="text-gray-700 text-base italic">File: {docUrl}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-600 italic text-lg">No documents uploaded for this user.</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
    );
};

export default Admin;