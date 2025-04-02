import React from "react";
import { FaFileAlt, FaMoneyCheckAlt, FaPassport } from "react-icons/fa";

const ProcessImg = () => {
  const steps = [
    {
      icon: <FaFileAlt size={50} className="text-[#B52721]" />,
      title: "Complete Online Registrations",
      description: "These cases are perfectly simple and easy to distinguish.",
    },
    {
      icon: <FaMoneyCheckAlt size={50} className="text-[#B52721]" />,
      title: "Documents and Payments",
      description: "These cases are perfectly simple and easy to distinguish.",
    },
    {
      icon: <FaPassport size={50} className="text-[#B52721]" />,
      title: "Receive your Visa Now",
      description: "These cases are perfectly simple and easy to distinguish.",
    },
  ];

  return (
    <div className="relative  py-16 px-6 text-center">

      
      
      <h2 className="text-4xl font-bold mb-10 relative z-10 text-[#003366]">
        Get your visa approved in <span className="text-[#B52721]">3 easy simple steps</span>
      </h2>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 relative z-10">
        {steps.map((step, index) => (
          <div key={index} className="text-center max-w-xs">
            <div className="w-24 h-24 flex items-center justify-center bg-white shadow-lg rounded-full mx-auto mb-4 border-2 border-red-600">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#B52721]">STEP 0{index + 1}</h3>
            <h2 className="text-xl font-bold mb-2 text-[#003366]">{step.title}</h2>
            <p className="text-gray-600 ">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessImg;
