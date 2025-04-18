import React from 'react';
import Footer from '../components/Footer';
import MainNav from '../components/MainNav';
import { useEffect } from 'react';

const About = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className=" text-gray-800">
      {/* MainNav */}
      <MainNav/>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Background Image with reduced opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
    style={{ backgroundImage: "url('https://www.qacglobal.com/qacglobal/images/hero-bg.jpg')" }}
  ></div>
  <div className="max-w-7xl mx-auto text-center relative z-10">
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-[#003366]">
      <span className="text-[#003366]">Aspire</span>
      <span className="text-[#B52721]">Abroad</span>
    </h2>
    <p className="text-xl max-w-3xl mx-auto text-gray-700">
      Your trusted partner in simplifying global visa and immigration processes.
    </p>
    <div className="mt-8">
      <button className="bg-[#003366] text-white hover:bg-[#B52721] font-bold py-3 px-6 rounded-lg text-lg cursor-pointer">
        Explore Services
      </button>
    </div>
  </div>

  {/* Abstract Shapes (optional, for added visual flair) */}
  <div className="absolute inset-0 flex items-center justify-around opacity-20">
    <div className="w-24 h-24 bg-blue-300 rounded-full blur-3xl"></div>
    <div className="w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
    <div className="w-20 h-20 bg-green-300 rounded-full blur-3xl"></div>
  </div>
</section>


      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
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
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow">Transparency</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow">Expertise</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow">Support</span>
            </div>
          </div>
          <div className="relative group rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Global network"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Strategy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We create tailored solutions for your international aspirations.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Image */}
            <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team working together"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Content */}
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-white p-6 border-l-4 border-blue-500 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Our Mission</h3>
                <p className="text-gray-600">
                  To be the leading global provider of immigration and visa services with the required reach, agility and client commitment to enable corporations and individuals to more easily navigate complex regulations.
                </p>
              </div>

              <div className="bg-white p-6 border-l-4 border-green-500 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Our Vision</h3>
                <p className="text-gray-600">
                  To provide comprehensive information, orientation and immigration outreach programs that help students, faculty, scholars and staff maintain legal immigration status while offering accurate and timely advice.
                </p>
              </div>

              <div className="bg-white p-6 border-l-4 border-purple-500 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Our Strategy</h3>
                <p className="text-gray-600">
                  To implement responsible strategies ensuring compliance with government regulations for international students and professionals, including effective management of visitor information systems and streamlined processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#003366] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-blue-200">By the Numbers</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Quantifying our commitment to your international success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ label: 'Successful Applications', value: '10K+' },
              { label: 'Countries Covered', value: '15+' },
              { label: 'Approval Rate', value: '98%' },
              { label: 'Client Support', value: '24/7' }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition duration-300">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default About;
