import React from "react";
import CategoryCards from "../Components/CategoryCards/CategoryCards";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Hero/Hero";
import NavBar from "../Components/NavBar/NavBar";
import ProductsCard from "../Components/Productscards/ProductsCard";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <CategoryCards />
      <ProductsCard />
      <Footer />
    </div>
  );
};

export default Home;
