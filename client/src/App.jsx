import { useState } from "react";
import { Routes,Route } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Reservation from "./components/Reservation";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ReservationSection from "./components/ReservationSection";
import Dashboard from "./components/Dashboard";

function App(){
  const[loading,setLoading]=useState(true);
  return(
     <>
    {loading && <Loader onFinish={()=> setLoading(false)}/>}
       <Routes>
      <Route path="/" element={
   <>
   <Navbar/>
   <Hero/>
   <Menu/>
   <ReservationSection/>
   <About/>
   <Testimonials/>
   <Footer/>
    </>
      }
      />
      <Route path="/reservation" element={<Reservation/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      </>
  );
}
export default App;
