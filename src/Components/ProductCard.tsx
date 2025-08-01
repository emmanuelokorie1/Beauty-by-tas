"use client";

import type React from "react";
import { useMemo, useCallback, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import productImg from "../assets/product.png";
import CustomButton from "./CustomButton";
import Skeleton from "react-loading-skeleton";
import { formatCurrency } from "../utils/CurrencyFormat";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

interface LocalCartItem {
  productId: string;
  productName?: string;
  price?: number | string;
  images?: string[];
  description?: string;
  quantity: number;
  totalStock?: number | string;
}

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoized calculations
  const stockInfo = useMemo(() => {
    const stockNum = Number(totalStock) || 0;
    const isOutOfStock = stockNum <= 0;
    const status = stockStatus?.toLowerCase();
    
    const statusColor = status?.includes("low")
      ? "text-red-500"
      : status?.includes("medium")
      ? "text-orange-500"
      : status?.includes("high") || status?.includes("limited")
      ? "text-green-500"
      : status?.includes("out") || isOutOfStock
      ? "text-gray-400"
      : "text-gray-400";

    const statusLabel = status?.includes("low")
      ? "Low Stock"
      : status?.includes("medium")
      ? "Medium Stock"
      : status?.includes("high")
      ? "In Stock"
      : status?.includes("out") || isOutOfStock
      ? "Out of Stock"
      : "";

    return { isOutOfStock, statusColor, statusLabel, stockNum };
  }, [totalStock, stockStatus]);

  const discountPercent = useMemo(() => {
    return price && discountPrice
      ? Math.round(100 - (Number(price) / Number(discountPrice)) * 100)
      : null;
  }, [price, discountPrice]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stockInfo.isOutOfStock) {
      toast.error("This item is out of stock");
      return;
    }

    if (!id) {
      toast.error("Product ID is missing");
      return;
    }
    
    if (!isAuthenticated) {
      // Add to local storage cart for non-authenticated users
      const localCart: LocalCartItem[] = JSON.parse(localStorage.getItem('localCart') || '[]');
      const existingItem = localCart.find((item: LocalCartItem) => item.productId === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        localCart.push({
          productId: id,
          productName: productName,
          price: price,
          images: img ? [img] : [],
          description: description,
          quantity: 1,
          totalStock: totalStock
        });
      }
      
      localStorage.setItem('localCart', JSON.stringify(localCart));
      toast.success("Added to cart! Login to save your cart.");
      onClick?.();
      return;
    }
    
    addToCart(id, 1);
    toast.success("Added to cart successfully!");
    onClick?.();
  }, [stockInfo.isOutOfStock, isAuthenticated, id, addToCart, onClick, navigate, productName, price, img, description, totalStock]);



  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (id) {
      navigate(`/description/${id}`);
    }
  }, [id, navigate]);

  const handleCardClick = useCallback(() => {
    if (id) {
      navigate(`/description/${id}`);
    }
  }, [id, navigate]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  const buttonText = useMemo(() => {
    if (stockInfo.isOutOfStock) return "Out of Stock";
    return "Add to Bag";
  }, [stockInfo.isOutOfStock]);

  if (loading) {
    return (
      <div className={`flex flex-col space-y-3 border border-gray-200 p-4 rounded-xl w-[${width || "24%"}] ${classLoading} bg-white h-[500px]`}>
        <Skeleton containerClassName="w-full h-[280px] rounded-lg" />
        <Skeleton containerClassName="w-3/4 h-6 rounded-lg" />
        <Skeleton containerClassName="w-full h-4 rounded-lg" />
        <Skeleton containerClassName="w-1/2 h-5 rounded-lg" />
        <Skeleton containerClassName="w-full h-10 rounded-lg" />
      </div>
    );
  }

  return (
    <div
      className={`w-[${width || "24%"}] ${classContainer} group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 transform hover:-translate-y-1 h-[500px] flex flex-col`}
      tabIndex={0}
      aria-label={`Product card for ${productName}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden flex-shrink-0">
        <Link to="#" onClick={handleCardClick} className="block">
          <div className="relative h-[280px] bg-gray-100">
            <img
              src={imageError ? productImg : (img || productImg)}
              alt={productName || "Product"}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {discountPercent}% OFF
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-lg ${
            stockInfo.isOutOfStock 
              ? 'bg-gray-500 text-white' 
              : stockInfo.statusColor === 'text-red-500'
              ? 'bg-red-100 text-red-700'
              : stockInfo.statusColor === 'text-orange-500'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-green-100 text-green-700'
          }`}>
            <GoDotFill size={10} className={stockInfo.statusColor} />
            <span className="ml-1">{stockInfo.statusLabel}</span>
          </div>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickView}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Quick view"
            >
              <FiEye size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-2 flex flex-col flex-1">
        <Link to="#" onClick={handleCardClick} className="block flex-1">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-primary-deepRed transition-colors" title={productName}>
            {productName || "Product Name"}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-1 leading-relaxed flex-1 h-[50px]" title={description}>
            {description || "Product description goes here"}
          </p>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(price || 0)}
            </span>
            {discountPrice && (
              <span className="text-sm line-through text-gray-400">
                {formatCurrency(discountPrice)}
              </span>
            )}
          </div>
        </Link>

        {/* Stock Info */}
        {!stockInfo.isOutOfStock && stockInfo.stockNum > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Stock available</span>
              <span className="font-medium">{stockInfo.stockNum} left</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  stockInfo.stockNum <= 5 ? 'bg-red-500' : 
                  stockInfo.stockNum <= 15 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ 
                  width: `${Math.min((stockInfo.stockNum / 50) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <CustomButton
            onClick={() => handleAddToCart({} as React.MouseEvent)}
            loading={isAddingToCart}
            text={buttonText}
            classNames={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              stockInfo.isOutOfStock 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-primary-deepRed text-white hover:bg-primary-deepRed/90 hover:shadow-lg transform hover:scale-[1.02]'
            }`}
            aria-label={buttonText}
          />
        </div>
      </div>

      {/* Out of Stock Overlay */}
      {stockInfo.isOutOfStock && (
        <div className="absolute inset-0 bg-white bg-opacity-20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 font-medium mb-2">Out of Stock</div>
            <button 
              onClick={() => navigate(`/description/${id}`)}
              className="text-sm text-primary-deepRed hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
