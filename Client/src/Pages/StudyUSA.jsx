import React, { useState, useEffect } from 'react';
import CountryNav from '../components/CountryNav';
import { useParams, useNavigate } from 'react-router-dom';
import USA from "../assets/USABackground.webp"; 
import Footer from '../components/Footer';

const StudyUSA = () => {
  const navigate = useNavigate();
  const { country } = useParams();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [colleges, setColleges] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLevelChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);  
  };

 
  const visaPage = (country) => {
    navigate(`/${country}/visa-application`);
  };
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError('');
      setColleges([]);

      try {
        const response = await fetch('http://localhost:0710/college?country=USA');
        const data = await response.json();

        if (response.ok) {
          setAllColleges(data.found); 
          setColleges(data.found); 
        } else {
          setError(data.message || 'Error fetching data');
        }
      } catch (err) {
        setError('An error occurred while fetching the data.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []); 

 
  useEffect(() => {
    if (!selectedLevel) {
      setColleges(allColleges); 
    } else {
      const filteredColleges = allColleges.filter((college) => {
      
        return college.level && college.level.toLowerCase() === selectedLevel.toLowerCase();
      });
      setColleges(filteredColleges);
    }
  }, [selectedLevel, allColleges]);  

  return (
    <div className="min-h-screen w-full">
      <div className="relative min-h-screen">

        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${USA})`,
            backgroundPosition: "50% 9%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: "-1",
          }}
        ></div>
        <div className='relative z-10'>
          <CountryNav name={country} />
        </div>

        <div className="my-8 px-6 text-center flex flex-col ">
          <h2 className="font-bold text-4xl text-[#003366] mb-4">
            Select the university or college you aspire to join.
          </h2>
          <p className="text-gray-600 text-lg">
            Explore top universities and colleges in United States Of America tailored to your academic goals.
          </p>
        </div>

        <div className="p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">
              Find Colleges by Level
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {['Bachelors', 'Masters', 'Doctorate', 'Dual'].map((level) => (
                <label key={level} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    checked={selectedLevel === level}
                    onChange={handleLevelChange}
                    className="form-radio h-5 w-5 text-[#003366]"
                  />
                  <span className="ml-2 text-gray-700 text-lg">{level}</span>
                </label>
              ))}
            </div>
          </div>

         
          {loading && (
            <div className="flex justify-center items-center opacity-80">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#003366] border-solid transition-all duration-500 ease-in-out"></div>
            </div>
          )}

          {error && <p className="text-[#B52721] text-center">{error}</p>}

          <div className="flex flex-wrap gap-6 w-full justify-evenly items-center">
            {colleges.length > 0 ? (
              colleges.map((college, index) => (
                <div
                  key={`${college.id}-${college.name}-${index}`} 
                  className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 overflow-hidden w-90"
                >
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-55 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-[#003366]">{college.name}</h3>
                    <p className="text-gray-600">
                      <strong>Location:</strong> {college.location}
                    </p>
                    <p className="text-gray-600">
                      <strong>Degree:</strong> {college.degree}
                    </p>
                    <p className="text-gray-600">
                      <strong>Cost:</strong> {college.cost} <span className='ml-1'>{college.INR}</span>
                    </p>
                    <p className="text-gray-600">
                      <strong>Ranking:</strong> {college.ranking}
                    </p>
                    <p className="text-gray-600">
                      <strong>Entry Requirements:</strong> {college.entry}
                    </p>
                    <button className="mt-4 w-full bg-[#B52721] text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p className="text-gray-600 text-center">No colleges found for the selected level.</p>
            )}
          </div>

          <div className="mt-12 text-center">
            <button
              className="px-6 py-4 bg-[#003366] text-white rounded-md hover:bg-[#B52721] transition-all"
              onClick={() => visaPage(country)}
            >
              Proceed to Student Visa Application
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default StudyUSA;
