import React from "react";
import CategoryCards from "../Components/Home/CategoryCards/CategoryCards";
import Hero from "../Components/Home/Hero/Hero";
import ProductsCard from "../Components/Home/Productscards/ProductsCard";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryCards />
      <ProductsCard />
    </div>
  );
};

export default Home;
