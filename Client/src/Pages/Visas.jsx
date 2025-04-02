import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CountryNav from '../components/CountryNav';
import Visatypes from '../components/Visatypes';
import ProcessImg from '../components/ProcessImg';
import globe from "../assets/Globe.webp";
import Footer from '../components/Footer';



const Visas = () => {
  const { country } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${globe})` , backgroundPosition: '50% 9%'}}
      ></div>
      
      <div className="relative z-10">
        <CountryNav name={country} />
        <Visatypes country={country} />
        <ProcessImg />
        <Footer/>
      </div>
    </div>
  );
}

export default Visas;
