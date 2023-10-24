import React from 'react'
import HeroSection from './Componetns/HeroSection'
import Destinations from './Componetns/Destination'
import "./homePage.css"
import AboutUs from './Componetns/About/AboutUs'
import Header from './Componetns/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Componetns/Footer'
import Pricing from './Componetns/Pricing/Pricing'



function HomePage() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<><HeroSection/><Destinations/></>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/pricing" element={<Pricing/>}/>

        </Routes>
        <Footer/>
    </>
  )
}

export default HomePage 