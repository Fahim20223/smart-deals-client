import React from "react";

import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;

  return (
    <div className="card bg-base-100 h-[500px] shadow-md pt-5 ">
      <figure className="px-4 pt-4 rounded-3xl">
        <img src={image} alt="Shoes" className="" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p className="text-primary font-semibold">
          {" "}
          ${price_min} - {price_max}
        </p>
        <div className="card-actions">
          <Link
            to={`/productDetails/${_id}`}
            className="btn btn-primary btn-outline w-full text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
