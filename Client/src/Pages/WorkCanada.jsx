import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryNav from "../components/CountryNav";
import Footer from "../components/Footer";
import Canbac from "../assets/CanadaBackground.webp";
import { useNavigate } from "react-router-dom";

const WorkCanada = () => {
  const [visaData, setVisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const { country } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jannat-aspireabroad.onrender.com/Canada/visa?visaType=Work"
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

      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center z-[-1]"
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),url(${Canbac})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 9%",
          zIndex: -1,
        }}
      ></div>

      <div className="relative">
        <CountryNav name={country} />
        <div className="p-6 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-[#003366] mt-6 mb-8">
            Tourist Visa
          </h2>

          {loading ? (
            <p className="text-center text-lg mt-4">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-4">{error}</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">

              <div className="w-full md:w-2/3 space-y-6">
                {visaData.map((visa, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white"
                  >
                    <h3 className="text-2xl font-bold text-[#003366]">
                      {visa.visaCategory}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <p className="font-semibold">
                        Stay:{" "}
                        <span className="font-normal text-gray-600">
                          {visa.stay || "N/A"}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Cost:{" "}
                        <span className="font-normal text-gray-600">
                          {visa.cost || "N/A"}
                        </span>
                      </p>
                    </div>

                    <p className="mt-4 font-semibold">About this visa:</p>
                    <p className="text-gray-700">
                      {visa.about || "No details available"}
                    </p>

                    <p className="mt-4 font-semibold">Eligibility:</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {visa.eligibility && visa.eligibility.length > 0 ? (
                        visa.eligibility.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))
                      ) : (
                        <li>No eligibility criteria available</li>
                      )}
                    </ul>

                    <div className="flex justify-end mt-4">
                      <button className="bg-[#B52721] text-white px-6 py-2 rounded-lg text-lg font-bold transition hover:bg-red-700 cursor-pointer" onClick={() => handleApplyClick(visa.visaType)}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>


              <div className="w-full md:w-1/3 space-y-6">

                <div className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white">
                  <h2 className="text-2xl font-bold text-[#003366] mb-4">
                    Step By Step Process
                  </h2>
                  <ol className="space-y-4">
                    {[
                      "Check your eligibility",
                      "Gather necessary documents",
                      "Apply online through the official portal",
                      "Pay the visa application fee",
                      "Attend Biometrics Appointment (if required)",
                      "Wait for processing and approval",
                      "Receive your visa decision",
                    ].map((step, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#B52721] text-white rounded-full font-semibold">
                          {index + 1}
                        </div>
                        <h2 className="text-black font-semibold">{step}</h2>
                      </li>
                    ))}
                  </ol>
                </div>


                <div className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white">
                  <h2 className="text-2xl font-bold text-[#003366] mb-4">
                    Basic Eligibility
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Valid passport",
                      "Sufficient funds",
                      "Health & character requirements",
                      "Have a clean criminal record (police clearance may be required)",
                      "Meet language proficiency requirements",
                     "Apply within the specified time frame based on visa type",
                     "Be eligible under the updated immigration policies and regulations"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                          ✔️
                        </div>
                        <h2 className="text-black font-semibold">{item}</h2>
                      </li>
                    ))}
                  </ul>
                </div>


                <div className="border-2 border-[#003366] rounded-xl p-6 shadow-md bg-white">
                  <h2 className="text-2xl font-bold text-[#003366] mb-4">
                    Required Documents
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Valid Passport",
"Skills Assessment",
"English Language Proficiency",
"Employer Sponsorship - Not required in Skilled Stream Visa",
"Work Experience",
"Educational Qualifications",
"Health and Character Documents",
"Proof of Funds",
"Proof of Relationship - Required if applying for family members",
"Expression of Interest (EOI) - Not required in PGWP & Open Work Permit",
"Points Test - Not required in PGWP & Open Work Permit"

                    ].map((doc, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-7 h-7 flex items-center justify-center bg-[#B52721] text-white rounded-full">
                          📄
                        </div>
                        <h2 className="text-black font-semibold">{doc}</h2>
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

export default WorkCanada;