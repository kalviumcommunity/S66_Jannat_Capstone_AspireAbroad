import React from 'react';
import TouristVisa from "../assets/TouristVisa.png";
import StudyVisa from "../assets/Study Visa.png";
import WorkVisa from "../assets/Workvisa.png";
import PermanentVisa from "../assets/PermanentVisa.png";
import { useNavigate } from 'react-router-dom';

const visaDetails = {
    "Tourist Visa": "Get your tourist visa hassle-free and explore your dream destinations.",
    "Study Visa": "We assist students in obtaining study visas for world-class education.",
    "Work Visa": "Obtain your work visa and unlock global career opportunities.",
    "Permanent Residence": "Start a new life with our PR visa assistance services."
};


const Visatypes = ({country}) => {
    const navigate = useNavigate(); 
    const handleExploreClick = (visaType) => {
        if (country=='Australia' && visaType=="Tourist Visa"){
            navigate(`/${country}/tourist-australia`)
        }
        if (country=='Australia' && visaType=="Work Visa"){
            navigate(`/${country}/Work-australia`)
        }
        if (country=='Canada' && visaType=="Tourist Visa"){
            navigate(`/${country}/tourist-Canada`)
        }
        if (country=='UK' && visaType=="Tourist Visa"){
            navigate(`/${country}/tourist-UK`)
        }
        if (country=='Canada' && visaType=="Work Visa"){
            navigate(`/${country}/Work-canada`)
        }
        if (country=='USA' && visaType=="Work Visa"){
            navigate(`/${country}/Work-USA`)
        }
        if (country=='UK' && visaType=="Work Visa"){
            navigate(`/${country}/Work-UK`)
        }
        if (country=='USA' && visaType=="Tourist Visa"){
            navigate(`/${country}/tourist-USA`)
        }
        if (country=='Australia' && visaType=="Study Visa"){
            navigate(`/${country}/Study-Australia`)
        }
        if (country=='Australia' && visaType=="Permanent Residence"){
            navigate(`/${country}/PR-Australia`)
        }
        if (country=='UK' && visaType=="Permanent Residence"){
            navigate(`/${country}/PR-UK`)
        }
        if (country=='USA' && visaType=="Permanent Residence"){
            navigate(`/${country}/PR-USA`)
        }
        if (country=='Canada' && visaType=="Permanent Residence"){
            navigate(`/${country}/PR-Canada`)
        }
        if (country=='Canada' && visaType=="Study Visa"){
            navigate(`/${country}/Study-Canada`)
        }
        if (country=='UK' && visaType=="Study Visa"){
            navigate(`/${country}/Study-UK`)
        }
        if (country=='USA' && visaType=="Study Visa"){
            navigate(`/${country}/Study-USA`)
        }
    };
    
    const images = [
        { src: TouristVisa, alt: "Tourist Visa" },
        { src: StudyVisa, alt: "Study Visa" },
        { src: WorkVisa, alt: "Work Visa" },
        { src: PermanentVisa, alt: "Permanent Residence" },
    ];

    return (
        <div className='mt-8'>
            <div className='flex justify-center text-center'>
                <h2 className='text-5xl font-bold w-1/2'>Visa Categories We Offer</h2>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-7 mt-10'>
                {images.map((image, idx) => (
                    <div 
                        key={idx} 
                        className='border border-black w-80 h-88 flex flex-col justify-center items-center text-center p-4 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 bg-white'
                    >
                        <img className='w-80 h-45 mb-4' src={image.src} alt={image.alt} />
                        <h2 className='text-2xl font-semibold mb-2'>{image.alt}</h2>
                        <p className='text-gray-500 mb-4'>{visaDetails[image.alt]}</p>
                        <button 
                            className='bg-[#B52721] text-white py-2 px-4 rounded-xl hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer' onClick={()=>handleExploreClick(image.alt)}
                        >
                            Explore
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Visatypes;