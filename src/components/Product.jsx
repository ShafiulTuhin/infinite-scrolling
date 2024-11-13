import React from "react";

const Product = ({ title, price, thumbnail }) => {
  return (
    <div className="flex flex-col p-4 border border-gray-800">
      <img
        src={thumbnail}
        alt=""
        className="h-32 w-32 border border-gray-400 rounded-lg"
      />
      <h2>{title}</h2>
      <h4>${price}</h4>
    </div>
  );
};

export default Product;
