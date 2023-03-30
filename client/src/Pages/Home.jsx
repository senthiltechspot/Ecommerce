import React from "react";
import CategoryCards from "../Components/Home/CategoryCards/CategoryCards";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Home/Hero/Hero";
import NavBar from "../Components/NavBar/NavBar";
import ProductsCard from "../Components/Home/Productscards/ProductsCard";

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
