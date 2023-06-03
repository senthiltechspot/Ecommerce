import React, { useState } from "react";
import CardItems from "../Components/ProductListPage/CardItems";

const ProductList = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  return (
    <div>
      <CardItems isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
    </div>
  );
};

export default ProductList;
