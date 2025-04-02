import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CountryNav from "../components/CountryNav";
import Footer from "../components/Footer";
import Ausbac from "../assets/AustraliaBackground.webp";

const AustraliaPR = () => {
  const [visaData, setVisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState(0);
  const [occupationDemand, setOccupationDemand] = useState(null);

  const [form, setForm] = useState({
    age: '',
    education: '',
    experience: '',
    english: false,
    regional: false,
    partner: false
  });

  const { country } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await fetch(
          `http://localhost:0710/Australia/visa?visaType=Permanent`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        
        if (result.visas && result.visas.length > 0) {
          setVisaData(result.visas);
        } else {
          throw new Error("Visa data not available");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculatePoints = () => {
    let total = 0;
    
    // Age points
    if (form.age === '18-24') total += 25;
    if (form.age === '25-32') total += 30;
    if (form.age === '33-39') total += 25;
    if (form.age === '40-44') total += 15;
    
    // Education points
    if (form.education === 'phd') total += 20;
    if (form.education === 'masters') total += 15;
    if (form.education === 'bachelors') total += 10;
    
    // Experience points
    if (form.experience === '8+') total += 20;
    if (form.experience === '5-7') total += 15;
    if (form.experience === '3-4') total += 10;
    
    // Additional points
    if (form.english) total += 10;
    if (form.regional) total += 5;
    if (form.partner) total += 5;
    
    setPoints(total);
  };
  const checkOccupationDemand = () => {
    // Simulate API call for occupation demand
    const demandLevels = ["Low", "Medium", "High"];
    const randomDemand = demandLevels[Math.floor(Math.random() * demandLevels.length)];
    setOccupationDemand(randomDemand);
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/enroll");
      return false;
    }
    return true;
  };

  const handleApplyClick = (id) => {
    if (!checkAuthentication()) {
      return;
    }
    navigate(`/documents/${id}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Absolute Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${Ausbac})`,
          backgroundPosition: "50% 9%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <CountryNav name={country} />
        <div className="p-6 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-[#003366] mt-6 mb-4">
            Permanent Residence Visa
          </h2>
          <p className="text-xl text-gray-700 mb-8">Your pathway to call Australis home forever</p>

          {loading ? (
            <p className="text-center text-lg mt-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-4">{error}</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
         
              <div className="w-full md:w-2/3 space-y-8">
        
                <div className="bg-gradient-to-br from-[#003366] to-[#0055a5] rounded-xl p-6 shadow-xl text-white">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-2">PR Eligibility Calculator</h3>
                      <p className="mb-6">Find out if you qualify for Australis Permanent Residence</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block mb-2 font-medium">Age Group</label>
                          <select 
  value={form.age}
  onChange={(e) => setForm({...form, age: e.target.value})}
  className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg backdrop-blur-sm text-black" // Add 
>
  <option value="">Select age</option>
  <option value="18-24">18-24 years</option>
  <option value="25-32">25-32 years</option>
  <option value="33-39">33-39 years</option>
  <option value="40-44">40-44 years</option>
</select>
                        </div>

                        <div>
                          <label className="block mb-2 font-medium">Highest Education</label>
                          <select 
                            value={form.education}
                            onChange={(e) => setForm({...form, education: e.target.value})}
                            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg backdrop-blur-sm text-black"
                          >
                            <option value="" className="text-gray-800">Select education</option>
                            <option value="phd" className="text-gray-800">PhD/Doctorate</option>
                            <option value="masters" className="text-gray-800">Master's Degree</option>
                            <option value="bachelors" className="text-gray-800">Bachelor's Degree</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 font-medium">Work Experience</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button
                            onClick={() => setForm({...form, experience: '1-2'})}
                            className={`py-2 px-3 rounded-lg ${form.experience === '1-2' ? 'bg-[#B52721]' : 'bg-white bg-opacity-10'} border border-white border-opacity-30 text-black`}
                          >
                            1-2 years
                          </button>
                          <button
                            onClick={() => setForm({...form, experience: '3-4'})}
                            className={`py-2 px-3 rounded-lg ${form.experience === '3-4' ? 'bg-[#B52721]' : 'bg-white bg-opacity-10'} border border-white border-opacity-30 text-black`}
                          >
                            3-4 years
                          </button>
                          <button
                            onClick={() => setForm({...form, experience: '5-7'})}
                            className={`py-2 px-3 rounded-lg ${form.experience === '5-7' ? 'bg-[#B52721]' : 'bg-white bg-opacity-10'} border border-white border-opacity-30 text-black`}
                          >
                            5-7 years
                          </button>
                          <button
                            onClick={() => setForm({...form, experience: '8+'})}
                            className={`py-2 px-3 rounded-lg ${form.experience === '8+' ? 'bg-[#B52721]' : 'bg-white bg-opacity-10'} border border-white border-opacity-30 text-black`}
                          >
                            8+ years
                          </button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block mb-2 font-medium">Additional Points</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={form.english}
                              onChange={() => setForm({...form, english: !form.english})}
                              className="h-5 w-5 rounded border-white border-opacity-50 bg-white bg-opacity-10"
                            />
                            <span>Proficient English</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={form.regional}
                              onChange={() => setForm({...form, regional: !form.regional})}
                              className="h-5 w-5 rounded border-white border-opacity-50 bg-white bg-opacity-10"
                            />
                            <span>Regional Study</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={form.partner}
                              onChange={() => setForm({...form, partner: !form.partner})}
                              className="h-5 w-5 rounded border-white border-opacity-50 bg-white bg-opacity-10"
                            />
                            <span>Partner Skills</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/3 flex flex-col">
                      <div className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg p-4 backdrop-blur-sm flex-grow flex flex-col items-center justify-center">
                        <div className="text-center mb-4">
                          <p className="text-sm opacity-80">Your PR Score</p>
                          <div className={`text-5xl font-bold my-2 ${points >= 65 ? 'text-green-600' : 'text-yellow-400'}`}>
                            {points}
                          </div>
                          <div className={`text-lg font-medium ${points >= 65 ? 'text-green-600' : 'text-yellow-400'}`}>
                            {points >= 65 ? 'Eligible' : 'Not Eligible'}
                          </div>
                        </div>
                        <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-4">
                          <div 
                            className={`h-full rounded-full ${points >= 65 ? 'bg-green-600' : 'bg-yellow-400'}`}
                            style={{ width: `${Math.min(100, (points / 100) * 100)}%` }}
                          ></div>
                        </div>
                        <button
                          onClick={calculatePoints}
                          className="w-full bg-[#B52721] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition"
                        >
                          Calculate Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visa Cards */}
                {visaData.map((visa, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <h3 className="text-2xl font-bold text-[#003366]">
                        {visa.visaCategory}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {visa.processingTime || "Processing varies"}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {visa.cost || "Cost varies"}
                        </span>
                      </div>
                      
                    </div>

                    <div className="">
                      <div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                      <p className="font-semibold">
                        Stay:{" "}
                        <span className="font-normal text-gray-800">
                          {visa.stay || "N/A"}
                        </span>
                      </p>
                      <p className="font-semibold">
                        About:{" "}
                        <span className="font-normal text-gray-800">
                          {visa.about || "N/A"}
                        </span>
                      </p>
                    </div>
                        <h4 className="font-bold text-lg mb-2">Benefits</h4>
                        <ul className="space-y-2">
                          {visa.eligibility?.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => handleApplyClick(visa.visaType)}
                        className="bg-[#B52721] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center"
                      >
                        Apply Now
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>


              <div className="w-full md:w-1/3 space-y-6">
              <div className="bg-gradient-to-br from-[#003366] to-[#0055a5] border-2 border-[#003366] rounded-xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold  mb-4 text-white">Quick Assessment</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">Occupation</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option>Select your occupation</option>
                        <option>Software Engineer</option>
                        <option>Healthcare Professional</option>
                        <option>Engineering Professional</option>
                        <option>Trade Occupation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">English Level</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option>Select English level</option>
                        <option>Competent (IELTS 6.0)</option>
                        <option>Proficient (IELTS 7.0)</option>
                        <option>Superior (IELTS 8.0)</option>
                      </select>
                    </div>
                    <button className="w-full bg-[#B52721] text-white py-2 px-4 rounded-md hover:bg-red-700 transition" onClick={checkOccupationDemand}>
                      Check Occupation Demand
                    </button>
                    {occupationDemand && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-800 mb-2">Occupation Demand:</h4 >
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            occupationDemand === 'High' ? 'bg-green-100 text-green-800' :
                            occupationDemand === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {occupationDemand} Demand
                          </span>
                          <span className="ml-2 text-sm text-gray-600">
                            {occupationDemand === 'High' ? 'This occupation is in high demand' :
                             occupationDemand === 'Medium' ? 'Moderate demand for this occupation' :
                             'Low demand for this occupation'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
   
                <div className="bg-white border-2 border-[#003366] rounded-xl p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-[#003366] mb-4">PR Pathway</h2>
                  <div className="relative">
                    <div className="absolute left-4 h-full w-0.5 bg-gray-200"></div>
                    <div className="space-y-8">
                      {[
                        { step: "Check Eligibility", icon: "📋", color: "bg-blue-100 text-blue-800" },
                        { step: "Submit EOI", icon: "📨", color: "bg-purple-100 text-purple-800" },
                        { step: "Receive Invitation", icon: "✉️", color: "bg-green-100 text-green-800" },
                        { step: "Lodge Application", icon: "📝", color: "bg-yellow-100 text-yellow-800" },
                        { step: "Health Checks", icon: "🏥", color: "bg-red-100 text-red-800" },
                        { step: "Visa Grant", icon: "🎉", color: "bg-indigo-100 text-indigo-800" }
                      ].map((item, index) => (
                        <div key={index} className="relative flex items-start">
                          <div className={`z-10 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${item.color}`}>
                            {item.icon}
                          </div>
                          <div className="min-w-0 flex-1 pt-1">
                            <h3 className="text-lg font-medium text-gray-900">{item.step}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>


                

      
                <div className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white">
                  <h2 className="text-2xl font-bold text-[#003366] mb-4">
                    Basic Requirements
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                        ✔️
                      </div>
                      <span className="font-semibold">Minimum 65 points</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                        ✔️
                      </div>
                      <span className="font-semibold">Age 18-44 preferred</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                        ✔️
                      </div>
                      <span className="font-semibold">IELTS 6.0 or equivalent</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                        ✔️
                      </div>
                      <span className="font-semibold">Occupation on skilled list</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                        ✔️
                      </div>
                      <span className="font-semibold">Health and character requirements</span>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white">
                  <h2 className="text-2xl font-bold text-[#003366] mb-4">
                    Required Documents
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "Passport bio-data page",
                      "Birth certificate",
                      "Marriage/relationship documents",
                      "Skills assessment result",
                      "English test results",
                      "Employment references",
                      "Educational certificates",
                      "Police clearance certificates",
                      "Medical examination reports"
                    ].map((doc, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                          📄
                        </div>
                        <span className="font-semibold">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AustraliaPR;