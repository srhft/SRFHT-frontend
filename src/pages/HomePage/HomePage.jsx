import React, {useEffect} from 'react'
import HeroSection from './Componetns/HeroSection'
import Destinations from './Componetns/Destination'
import "./homePage.css"
import AboutUs from './Componetns/About/AboutUs'
import Header from './Componetns/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Componetns/Footer'
import Pricing from './Componetns/Pricing/Pricing'
import Contactus from './Componetns/contactus/Contactus'
import Faq from './Componetns/faq/Faq'
import AOS from "aos";
import "aos/dist/aos.css";



function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 800,  delay: 100,   });
  }, []);

  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<><HeroSection/><Destinations/><AboutUs/><Pricing/><Faq/><Contactus/></>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/contactus" element={<Contactus/>}/>
            
        </Routes>
        <Footer/>
    </>
  )
}

export default HomePage 