import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";
import video5 from "../assets/video5.mp4";
import video6 from "../assets/video6.mp4";
import video7 from "../assets/video7.mp4";

const VideoCarousel = () => {
  const videos = [
    { src: video1, text: "BEST VISA & IMMIGRATION SERVICES" },
    { src: video2, text: "GLOBAL IMMIGRATION SOLUTIONS" },
    { src: video3, text: "EASY VISA APPLICATION PROCESS" },
    { src: video4, text: "TRUSTED PARTNER FOR VISA SERVICES" },
    { src: video5, text: "FAST AND SECURE IMMIGRATION" },
    { src: video6, text: "YOUR PATHWAY TO A NEW COUNTRY" },
    { src: video7, text: "PERSONALIZED IMMIGRATION ASSISTANCE" },
  ];

  return (
    <div className="mx-auto relative mt-18">
      <Carousel 
        autoPlay 
        infiniteLoop 
        interval={4000} 
        showStatus={false} 
        showArrows={false} 
        showThumbs={false}
        transitionTime={1000}
      >
        {videos.map((video, index) => (
          <div key={index} className="relative">
            <video 
              className="w-full h-[600px] object-cover opacity-50"
              autoPlay 
              loop 
              muted
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute top-0 left-0 w-full h-full bg-blue-100 opacity-30 z-5 transition-opacity"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              text-white text-center z-10">
              
              <h1 className="text-[#003366] text-4xl lg:text-6xl font-bold w-full">
                {video.text}
              </h1>
              
              <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-[#B52721] rounded-lg shadow-md 
                hover:bg-red-700 transition duration-300 cursor-pointer">
                Discover More
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default VideoCarousel;
