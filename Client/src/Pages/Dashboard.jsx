import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const Dashboard = () => {
    const [userId, setUserId]=useState(null)
    const [userDetail,setUserDetails]=useState([])


    const fetchdata=async()=>{
        try{
            const id = localStorage.getItem('userID');
            const token=localStorage.getItem('Token')
            const res = await fetch(`http://localhost:0710/user-documents/${id}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }})
            const data=await res.json()
            console.log(data)
            setUserDetails(data.documents[0]?.user || null);
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])
  const steps = [
    { title: 'Application Submitted', comment: 'Your application has been received.' },
    { title: 'Documents Verified', comment: 'Documents reviewed by the case officer.' },
    { title: 'Background Check', comment: 'Background check is in process.' },
    { title: 'Interview Scheduled', comment: 'Interview has been scheduled.' },
    { title: 'Payment Completed', comment: 'All required visa fees have been paid successfully.' },
    { title: 'Interview Completed', comment: 'You have completed the interview.' },
    { title: 'Visa Approved', comment: 'Your visa has been approved!' },
    { title: 'Visa Issued', comment: 'Visa is issued and sent to your address.' },
  ];

  const currentStep = 1;
  const progressPercentage = Math.round((currentStep + 1) / steps.length * 100);

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-grow  p-8 mt-12">
        <div className='flex justify-between bg-white w-full shadow-lg rounded-xl p-6 mb-8 border-l-4 border-[#B52721]'>
          <div className="backdrop-blur-md ">
            <h2 className="text-4xl font-bold text-[#003366]">Visa Tracker</h2>
            <p className="text-gray-700">Stay updated with every step of your visa process.</p>
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
  
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg"
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-[#B52721] mb-4"
              />
              <h2 className="text-xl font-bold text-[#003366]">{userDetail.firstname} {userDetail.lastname}</h2>
              <p className="text-sm text-gray-500">{userDetail.email}</p>
              <p className="text-sm text-gray-500">{userDetail.phoneNumber}</p>
            </div>
          </div>
  
          <div className="lg:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard title="Country" value={userDetail.countryresidence}/>
              <InfoCard title="Destination" value={userDetail.destination} />
              <InfoCard title="Visa Type" value={userDetail.visaType} />
              <InfoCard title="Application ID" value="APP20250416" />
              <InfoCard title="Status" value="In Progress" status />
              <InfoCard title="Last Updated" value={new Date().toLocaleString()} />
            </div>
  
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#003366] mb-4">Application Timeline</h3>
              <ol className="relative border-l border-blue-200">
                {steps.map((step, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <div
                      className={`absolute w-4 h-4 rounded-full -left-2.5 top-1 ${
                        index <= currentStep ? 'bg-[#B52721]' : 'bg-gray-300'
                      }`}
                    ></div>
                    <h4
                      className={`font-semibold ${
                        index <= currentStep ? 'text-[#B52721]' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500">{step.comment}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
  
};

// Card component
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
