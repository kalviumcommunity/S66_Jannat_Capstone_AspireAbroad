import React from 'react';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div >
      <MainNav />
      
      {/* Hero Section */}
      <div className="relative  py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 mt-10 ">
           <span className='text-[#003366]'>Aspire<span className='text-[#B52721]'>Abroad</span></span>
          </h1>
          <p className="text-xl max-w-4xl mx-auto text-gray-800 ">
            Your trusted partner in simplifying global visa and immigration processes
          </p>
        </div>
      </div>
      {/* <div className='relative'>
       <h1>AspireAbroad</h1>
      </div> */}

      {/* Introduction Section */}
      <div className=" px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">
                Simplifying Your Global Journey
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to AspireAbroad, where we transform the complex visa and immigration process into a seamless experience. 
                We understand the challenges of navigating through eligibility criteria, document requirements, and strict deadlines.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform is designed to provide clarity, reduce stress, and empower you with the tools needed for successful 
                visa applications to countries like Canada, Australia, the UK, or the USA.
              </p>
              <div className="flex space-x-4 pt-4">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Transparency
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  Expertise
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Support
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Global network" 
                className="relative rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Strategy Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We create tailored solutions for your international aspirations
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative h-full rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition duration-300">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team working together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold">Your Success Is Our Priority</h3>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="lg:w-1/2 space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                    <p className="text-gray-600">
                      To be the leading global provider of immigration and visa services with the required reach, 
                      agility and client commitment to enable corporations and individuals to more easily 
                      navigate complex regulations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-green-500">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                    <p className="text-gray-600">
                      To provide comprehensive information, orientation and immigration outreach programs that help students, 
                      faculty, scholars and staff maintain legal immigration status while offering accurate and timely advice.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-purple-500">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Strategy</h3>
                    <p className="text-gray-600">
                      To implement responsible strategies ensuring compliance with government regulations for international students 
                      and professionals, including effective management of visitor information systems and streamlined processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#003366] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-200 font-medium mb-4">
              <div className="w-8 h-0.5 bg-blue-300 mx-auto"></div>
              BY THE NUMBERS
              <div className="w-8 h-0.5 bg-blue-300 mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Quantifying our commitment to your international success
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Successful Applications" },
              { value: "15+", label: "Countries Covered" },
              { value: "98%", label: "Approval Rate" },
              { value: "24/7", label: "Client Support" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition duration-300">
                <div className="text-4xl sm:text-5xl font-bold mb-2 text-white">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;