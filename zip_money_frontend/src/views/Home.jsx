import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navbar";
import Hero from "../layouts/Hero";
import Features from "../layouts/Features";
import Footer from "../components/Footer";
import AboutUs from "../layouts/AboutUs";

const Home = () => {
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Navigation scrollToSection={scrollToSection} />
      <Hero />
      <Features />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
