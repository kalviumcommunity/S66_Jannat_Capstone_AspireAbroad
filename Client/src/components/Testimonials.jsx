import React from "react";

const Testimonials = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-12 mb-16">
      <h2 className="text-5xl font-bold text-center mb-6">What Our Clients Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
      
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <p className="text-lg text-gray-700 mb-4">
            "This service changed my life! The team was incredibly supportive and helped me every step of the way."
          </p>
          <div className="flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Client"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">John Doe</p>
              <p className="text-gray-500">Software Engineer</p>
            </div>
          </div>
        </div>

  
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <p className="text-lg text-gray-700 mb-4">
            "I was able to achieve my goals thanks to the professional guidance and seamless support. Highly recommended!"
          </p>
          <div className="flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Client"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Jane Smith</p>
              <p className="text-gray-500">Project Manager</p>
            </div>
          </div>
        </div>

 
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
          <p className="text-lg text-gray-700 mb-4">
            "The process was smooth and easy to understand. I feel confident and excited for the next steps in my journey."
          </p>
          <div className="flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="Client"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Mark Taylor</p>
              <p className="text-gray-500">Marketing Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
