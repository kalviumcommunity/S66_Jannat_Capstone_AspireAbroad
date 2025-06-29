import React from "react";
import logo from "../assets/logo.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-[#003366] py-10 shadow-2xl w-full " id="footer">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="flex flex-wrap justify-between items-start">
          
    
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center space-x-3">
              <img className="h-12 w-12" src={logo} alt="AspireAbroad Logo" />
              <h1 className="text-2xl ">
                Aspire<span className="text-[#B52721]">Abroad</span>
              </h1>
            </div>
            <p className="mt-4 text-gray-600">
              Your trusted partner in global immigration services. Let us guide you through the complex process of obtaining visas, work permits, and residency.
            </p>
          </div>


          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#B52721]">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#B52721]">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#B52721]">Visa Requirements</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#B52721]">Contact Us</a></li>
            </ul>
          </div>


          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <ul className="mt-4 space-y-2">
              <li><span className="text-gray-600 hover:text-[#B52721] cursor-pointer">Email: cshsjannat2987@gmail.com</span></li>
              <li><span className="text-gray-600 hover:text-[#B52721] cursor-pointer">Phone: +91 9815220961</span></li>
              <li><span className="text-gray-600 hover:text-[#B52721] cursor-pointer">
              Location: Lovely Professional University, Phagwara, Punjab</span></li>
            </ul>
          </div>


          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.linkedin.com/in/jannat-0a457a328/">
                <FaLinkedin className="text-4xl text-black" />
              </a>
              <a href="https://github.com/Jannat150" >
                <FaGithub className="text-4xl text-black"  />
              </a>
              <a href="https://www.instagram.com/its_jannat_26/">
                <FaSquareInstagram className="text-4xl text-black" />
              </a>
              
            </div>
          </div>
        </div>


        <div className="mt-12 text-center text-sm text-gray-500">
          <p>&copy; 2025 AspireAbroad. All rights reserved.</p>
          <p>
            <a href="#" className="hover:text-[#B52721]">Privacy Policy</a> | 
            <a href="#" className="hover:text-[#B52721]"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
