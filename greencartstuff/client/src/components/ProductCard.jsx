import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();
  const navigate = useNavigate();

  if (!product) return null; 

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all w-full max-w-xs flex flex-col">
      {/* Image & Navigation */}
      <div
        className="cursor-pointer flex items-center justify-center p-4"
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
      >
        <img
          className="group-hover:scale-105 transition-transform max-h-40 object-contain"
          src={product.image?.[0] || assets.placeholder_img}
          alt={product.name || "Product"}
        />
      </div>

      {/* Product Details */}
      <div className="px-4 py-2 flex flex-col gap-2 flex-grow">
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                className="w-4 h-4"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating star"
              />
            ))}
          <span className="text-gray-500 text-sm">(4)</span>
        </div>

        {/* Price + Cart Controls */}
        <div className="flex items-center justify-between mt-auto">
          <p className="text-primary font-semibold text-lg">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-gray-400 text-sm line-through ml-1">
              {currency}
              {product.price}
            </span>
          </p>

          <div>
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary hover:bg-pr text-white text-sm px-3 py-1.5 rounded-md transition"
                onClick={(e) => {
                  e.stopPropagation(); 
                  addToCart(product._id);
                }}
              >
                <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-indigo-100 border border-indigo-300 rounded-md px-2 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(product._id);
                  }}
                  className="text-pr font-bold px-2 hover:text-indigo-800"
                >
                  -
                </button>
                <span className="w-5 text-center text-sm font-medium">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id);
                  }}
                  className="text-pr font-bold px-2 hover:text-indigo-800"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
