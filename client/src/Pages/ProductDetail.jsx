import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const url =`http://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products/${params.id}`;

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setFetchedData(data);
    };
    getData();
  }, [url]);

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default ProductDetail;
