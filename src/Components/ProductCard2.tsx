"use client";

import type React from "react";
import { GoDotFill } from "react-icons/go";
import productImg from "../assets/product.png";
import CustomButton from "./CustomButton";
import { formatCurrency } from "../utils/CurrencyFormat";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

interface CustomProps {
  classContainer?: string;
  width?: string;
  img?: string;
  description?: string;
  productName?: string;
  price?: number | string;
  discountPrice?: number | string;
  id?: string;
  stockStatus?: string;
  onClick?: () => void;
}

const ProductCard2: React.FC<CustomProps> = ({
  classContainer,
  width,
  img,
  description,
  productName,
  price,
  id,
  discountPrice,
  onClick,
  stockStatus,
}) => {
  const { addToCart, isAddingToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/auth/login");
      return;
    }
    if (!id) {
      toast.error("Product ID is missing");
      return;
    }
    addToCart(id, 1);
    if (onClick) {
      onClick();
    }
  };

  const status = stockStatus?.toLowerCase();
  const statusColor = status?.includes("low")
    ? "text-red-500"
    : status?.includes("medium")
    ? "text-orange-500"
    : status?.includes("high") || status?.includes("limited")
    ? "text-green-500"
    : status?.includes("out")
    ? "text-gray-400"
    : "text-gray-400";

  const statusLabel = status?.includes("low")
    ? "Low Stock"
    : status?.includes("medium")
    ? "Medium Stock"
    : status?.includes("high")
    ? "In Stock"
    : status?.includes("out")
    ? "Out of Stock"
    : "";

  const discountPercent =
    price && discountPrice
      ? Math.round(100 - (Number(price) / Number(discountPrice)) * 100)
      : null;

  return (
    <div
      className={`w-[${
        width || "100%"
      }] ${classContainer} bg-gradient-to-br from-primary-deepRed/10 to-white p-0 my-[1rem] box-border rounded-xl shadow-md hover:scale-[1.03] transition-transform group`}
      tabIndex={0}
      aria-label={`Product card for ${productName}`}
    >
      <Link to={`/description/${id || 1}`}>
        <div className="relative flex justify-center items-center h-[340px] rounded-t-xl overflow-hidden">
          <img
            src={img || productImg}
            alt={productName || "Product"}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-primary-deepRed text-white px-3 py-1 rounded-lg text-lg font-bold shadow">
            {formatCurrency(price || 0)}
          </div>
          {discountPrice && (
            <div className="absolute top-3 right-3 bg-white text-primary-deepRed px-2 py-1 rounded text-xs font-bold border border-primary-deepRed">
              {discountPercent && `${discountPercent}% OFF`}
            </div>
          )}
        </div>
        <div className="p-4">
          <div
            className="text-lg font-bold text-primary-deepRed truncate"
            title={productName}
          >
            {productName || "__"}
          </div>
          <div
            className="font-serif text-[.95rem] text-[#555B62] mt-1 mb-2 line-clamp-3 min-h-[48px]"
            title={description}
          >
            {description || "__"}
          </div>
          {status && (
            <div className="flex items-center text-gray-500 font-300 border px-[.6rem] rounded-[3rem] w-fit mb-2">
              <GoDotFill size={15} className={statusColor} />
              <div className="ml-1">{statusLabel}</div>
            </div>
          )}
          <CustomButton
            onClick={handleAddToCart}
            loading={isAddingToCart}
            text={isAuthenticated ? "Add to Bag" : "Login to Add"}
            classNames="hover:bg-primary-deepRed transition-all border border-primary-deepRed w-full text-primary-deepRed hover:text-white px-[1.5rem] py-[.5rem] mt-2"
            aria-label={isAuthenticated ? "Add to Bag" : "Login to Add"}
          />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard2;
