import React, { useState,useEffect } from 'react';
import Ausbac from "../assets/AustraliaBackground.webp";
import Canbac from "../assets/CanadaBackground.webp";
import UK from "../assets/UKBackground.webp";
import USA from "../assets/USABackground.webp"
import CountryNav from '../components/CountryNav'; 
import { useParams } from 'react-router-dom'; 
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const VisaApplication = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const { country } = useParams(); 
  const [step, setStep] = useState(1);
  const navigate=useNavigate()
  

  const backgroundImage=()=>{
    switch(country){
      case "Australia":
        return Ausbac;
      case "Canada":
        return Canbac; 
      case "UK":
        return UK;
      case "USA":
        return USA;     
    }
  }

  const visaProcess = [
    {
      title: "Step 1: Visa Application Process",
      description: (
        <div className="space-y-4">
          <p>
            The first step in your student visa application is to gather all necessary documents and fill out the application form. Once you submit the application, it will be reviewed by the Australian immigration authorities.
          </p>
          <p>
            You'll need to ensure that all your personal information, including course details and finances, is accurate and up to date.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2: Eligibility Criteria",
      description: (
        <div className="space-y-4">
          <ul className="list-disc list-inside">
            <li>Valid passport with at least 6 months validity remaining.</li>
            <li>Confirmation of Enrollment (CoE) from an Australian educational institution.</li>
            <li>Proof of sufficient funds to support yourself during your studies.</li>
            <li>Health and character checks (medical certificate and police clearance).</li>
            <li>English proficiency test score (if applicable).</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Step 3: Document Requirements",
      description: (
        <div className="space-y-4">
          <ul className="list-disc list-inside">
            <li>Passport (valid for at least 6 months).</li>
            <li>Confirmation of Enrollment (CoE) from the Australian institution.</li>
            <li>Financial evidence (bank statements, sponsorship, etc.).</li>
            <li>Health insurance (Overseas Student Health Cover - OSHC).</li>
            <li>Proof of English proficiency (IELTS, TOEFL, PTE, etc.).</li>
            <li>Police and medical certificates (if requested).</li>
            <li>Visa application fee receipt.</li>
          </ul>
        </div>
      ),
    },
  ];


  const handleNext = () => {
    if (step < visaProcess.length) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const checkAuthentication = () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/enroll");
      return false;
    }
    return true;
  };

  const handleApplyClick = () => {
    if (!checkAuthentication()) {
      return;
    }
    navigate(`/documents/Study`);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="relative min-h-screen">
   
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${backgroundImage()})`,
            backgroundPosition: "50% 9%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: "-1",
          }}
        ></div>

   
        <div className="relative z-10">
          <CountryNav name={country} />
        </div>


        <div className="relative z-10 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">

            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-600">
                  Step {step} of {visaProcess.length}
                </div>
                <div className="w-3/4 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#003366] rounded-full transition-all duration-300"
                    style={{ width: `${((step - 1) / (visaProcess.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

     
            <h2 className="text-3xl font-bold text-[#003366] text-center mb-8">
              Student Visa Application
            </h2>


            <div className="step-container">
              <h3 className="text-2xl font-bold text-[#003366] mb-6">
                {visaProcess[step - 1].title}
              </h3>
              <div className="text-gray-700 leading-relaxed">
                {visaProcess[step - 1].description}
              </div>
            </div>


            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrev}
                className={`px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all cursor-pointer ${
                  step === 1 ? 'invisible' : ''
                }`}
              >
                Previous
              </button>
              <button
                onClick={step === visaProcess.length ? handleApplyClick : handleNext}
                className="px-6 py-2 bg-[#003366] text-white rounded-md hover:bg-[#B52721] transition-all cursor-pointer"
              >
                {step === visaProcess.length ? 'Submit Application' : 'Next'}
              </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default VisaApplication;