import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import ProductDetails from "../Components/ProductDetails/ProductDetails";

const ProductDetail = () => {
  const [isUpdated, setIsUpdated] = useState(false);

  
  return (
    <div>
      {/* <NavBar isUpdated={isUpdated} setIsUpdated={setIsUpdated} /> */}
      <ProductDetails isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
    </div>
  );
};

export default ProductDetail;
