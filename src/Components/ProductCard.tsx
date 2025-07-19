"use client";

import type React from "react";
import { GoDotFill } from "react-icons/go";
import productImg from "../assets/product.png";
import CustomButton from "./CustomButton";
import Skeleton from "react-loading-skeleton";
import { formatCurrency } from "../utils/CurrencyFormat";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

interface CustomProps {
  classContainer?: string;
  classLoading?: string;
  width?: string;
  img?: string;
  loading?: boolean;
  description?: string;
  productName?: string;
  price?: number | string;
  discountPrice?: number | string;
  totalStock?: number | string;
  id?: string;
  stockStatus?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<CustomProps> = ({
  classContainer,
  classLoading,
  width,
  img,
  loading,
  description,
  productName,
  price,
  id,
  discountPrice,
  onClick,
  stockStatus,
  totalStock
}) => {
  const { addToCart, isAddingToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isOutOfStock) return;
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

  const isOutOfStock = !totalStock || Number(totalStock) <= 0;

  // Store product in sessionStorage on card click
  const handleCardClick = () => {
    if (id) {
      navigate(`/description/${id}`);
    }
  };

  return (
    <>
      {loading ? (
        <div
          className={`flex flex-col space-y-2 border border-gray-200 p-[.5rem] rounded-lg w-[${
            width || "24%"
          }] ${classLoading}`}
        >
          <Skeleton containerClassName="w-[100%] h-[180px] rounded-lg" />
          <Skeleton containerClassName="w-[40%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[90%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[70%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[50%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[100%] h-[30px] rounded-lg" />
        </div>
      ) : (
        <div
          className={`w-[${
            width || "24%"
          }] ${classContainer} p-[1rem] my-[1rem] box-border border border-primary-deepRed border-opacity-[0.3] rounded-lg hover:shadow-lg transition-all group relative`}
          tabIndex={0}
          aria-label={`Product card for ${productName}`}
        >
          <Link to="#" onClick={handleCardClick}>
            <div className="relative flex justify-center items-center py-2 h-[300px]">
              <img
                src={img || productImg}
                alt={productName || "Product"}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* NEW badge */}
              {/* {isNew && <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded">NEW</span>} */}
            </div>
            <div
              className="text-[1.1rem] font-semibold text-[#000914] truncate"
              title={productName}
            >
              {productName || "__"}
            </div>
            <div
              className="font-serif text-[.85rem] line-clamp-2 text-[#555B62] leading-[1.3rem] h-[20px]"
              title={description}
            >
              {description || "__"}
            </div>
            <div className="flex gap-[.7rem] text-[.88rem] py-[.5rem] items-center">
              <div className="font-semibold">{formatCurrency(price || 0)}</div>
              {discountPrice && (
                <>
                  <div className="line-through decoration-1 text-gray-400">
                    {formatCurrency(discountPrice)}
                  </div>
                  <div className="text-red-500 text-xs">
                    {discountPercent && `(${discountPercent}% off)`}
                  </div>
                </>
              )}
            </div>
            {/* Stock status */}
            {status && (
              <div className="flex items-center text-gray-500 font-300 border px-[.6rem] rounded-[3rem]">
                <GoDotFill size={15} className={statusColor} />
                <div className="ml-1">{statusLabel}</div>
              </div>
            )}
          </Link>
          <div className="mt-[1rem]">
            <CustomButton
              onClick={handleAddToCart}
              loading={isAddingToCart}
              text={isOutOfStock ? "Out of Stock" : isAuthenticated ? "Add to Bag" : "Login to Add"}
              classNames={`hover:bg-primary-deepRed transition-all border border-primary-deepRed w-[100%] text-primary-deepRed hover:text-white px-[1.5rem] py-[.5rem] ${isOutOfStock ? 'opacity-60 cursor-not-allowed' : ''}`}
              aria-label={isOutOfStock ? "Out of Stock" : isAuthenticated ? "Add to Bag" : "Login to Add"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;