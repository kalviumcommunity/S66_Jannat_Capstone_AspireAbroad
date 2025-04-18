import React from 'react';
import Australia from "../assets/Australia.png";
import Canada from "../assets/Canada.png";
import England from "../assets/England.png";
import USA from "../assets/USA.png";
import { useNavigate } from 'react-router-dom';

const Countries = () => {
    const Navigate=useNavigate()
    const images = [
        { src: Australia, alt: "Australia" },
        { src: Canada, alt: "Canada" },
        { src: England, alt: "UK" },
        { src: USA, alt: "USA" },
    ];
const handleClick=(country)=>{
    Navigate(`/visas/${country}`)

}
    return (
        <div className='mt-12' id='countries'>
            <div className='flex justify-center text-center'>
                <h2 className='text-5xl font-bold w-1/2'>Countries We Support For Immigration</h2>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-7 mt-10 '>
                {
                    images.map((image, idx) => (
                        <div 
                            key={idx} 
                            className='border border-black w-80 h-85 flex flex-col justify-center items-center text-center p-4 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 '
                        >
                            <img className="w-80 h-55 mb-4" style={{height:"355px"}} src={image.src} alt={image.alt} />
                            <h2 className='text-2xl font-semibold mb-2'>{image.alt}</h2>
                            <p className='text-gray-500 mb-4'>We will help you in every step of the Visa application process.</p>
                            <button 
                                className='bg-[#B52721] text-white py-2 px-4 rounded-xl hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer' onClick={()=>handleClick(image.alt)}
                            >
                                Get Started
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Countries;
