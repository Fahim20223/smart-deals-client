import React from "react";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  return (
    <div>
      <button className="btn btn-accent">I want to buy The product</button>
    </div>
  );
};

export default ProductDetails;
