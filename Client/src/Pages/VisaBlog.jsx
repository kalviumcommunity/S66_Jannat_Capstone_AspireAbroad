import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MainNav from '../components/MainNav';
import { Link } from 'react-router-dom';
import globe from "../assets/Globe.webp"; 

const VisaBlog = () => {
   const [data, setData] = useState([]);
   const [loading,setLoading]=useState(true)

   const fetchData = async () => {
    setLoading(true)
    const request = await fetch("https://jannat-aspireabroad.onrender.com/blog");
    const response = await request.json();
    if (response) {
        console.log(response);
        setLoading(false)
        setData(response);
    }
   };

   useEffect(() => {
    fetchData();
   }, []);
     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);

  return (
    <div className="relative min-h-screen">
    
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${globe})`, backgroundPosition: '50% 9%' }}
        ></div>

        <div className="relative z-10 ">
          <MainNav />
          
    
          <div className="container mx-auto text-center mt-20">
            <h2 className="text-6xl font-bold mt-10">Immigration News and Updates</h2>
            <p className="text-lg mt-2 text-[#003366]">Stay updated with the latest immigration and visa news.</p>
          </div>

          <div className="container mx-auto px-6 py-12">
            {loading?(<div className="flex justify-center items-center h-40">
    <div className="big-arc-plane text-6xl">✈️</div>
  </div>):(<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {data.map((i, idx) => (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img 
                    src={i.image} 
                    alt="Visa News" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Visa Policy Update for 2025</h2>
                    <p className="text-gray-600 mt-3">
                      {i.para}
                    </p>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-sm text-gray-500">{i.date}</span>
                      <p className="text-indigo-600 font-semibold hover:text-indigo-800">
                        <Link to={i.link}>Read</Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>)}
            
          </div>

          <Footer />
        </div>
    </div>
  );
};

export default VisaBlog;
