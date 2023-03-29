import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import CardItems from "../Components/ProductListPage/CardItems";

const ProductList = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  return (
    <div>
      <NavBar isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      <CardItems isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
    </div>
  );
};

export default ProductList;
