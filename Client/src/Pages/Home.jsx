import React from 'react'
// import Navbar from '../components/MainNav'
import Carousel from '../components/Carousel'
import Countries from '../components/Countries'
import Reasons from '../components/Reasons'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import MainNav from '../components/MainNav'
import CountryFAQSection from '../components/FAQPage'
import Scene from '../components/Earth'

const Home = () => {
  return (
    <div >
      <MainNav/>
      <Carousel/>
      <Countries/>
      <Reasons/>
      {/* <div style={{ width: "100vw", height: "100vh" }}>
      <Scene/>
    </div> */}
      <CountryFAQSection/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home
