"use client"

import type React from "react"
import { GoHeart, GoDotFill } from "react-icons/go"
import productImg from "../assets/product.png"
import CustomButton from "./CustomButton"
import Skeleton from "react-loading-skeleton"
import { formatCurrency } from "../utils/CurrencyFormat"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { toast } from "sonner"

interface CustomProps {
  classContainer?: string
  classLoading?: string
  width?: string
  img?: string
  loading?: boolean
  description?: string
  productName?: string
  price?: number | string
  id?: string
  onClick?: () => void
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
  onClick,
}) => {
  const { addToCart, isAddingToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    // Prevent navigation when clicking add to cart

    console.log("Add to cart clicked for product:", id) // Debug log
    console.log("User authenticated:", isAuthenticated) // Debug log

    if (!isAuthenticated) {
      toast.error("Please login to add items to cart")
      navigate("/auth/login")
      return
    }

    if (!id) {
      toast.error("Product ID is missing")
      console.error("Product ID is missing:", { id, description, productName })
      return
    }

    console.log("Calling addToCart with ID:", id) // Debug log
    addToCart(id, 1)

    if (onClick) {
      onClick()
    }
  }

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
          }] ${classContainer} p-[1rem] my-[1rem] box-border border border-primary-deepRed border-opacity-[0.3] rounded-lg hover:shadow-lg transition-all`}
        >
          <div className="flex items-center justify-between">
            <div className="bg-primary-textColor text-white px-[.5rem] text-[.9rem] rounded-lg">NEW</div>
            <div className="cursor-pointer text-primary-textColor">
              <GoHeart className="hover:text-[red] transition-all-3s" size={30} />
            </div>
          </div>

          <Link to={`/description/${id || 1}`}>
            <div className="flex justify-center items-center py-2">
              <div className="py-2 h-[250px] w-full">
                <img src={img || productImg} alt="Product" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="text-[.85rem] text-[#555B62]">{productName || "Lip Stain"}</div>
            <div
              className="font-serif text-[1.1rem] font-semibold text-[#000914] leading-[1.3rem] h-[20px]"
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {description || "Intergalactic Lip Oil - Red"}
            </div>
            <div className="flex gap-[.7rem] text-[.88rem] py-[.5rem]">
              <div className="font-semibold">{formatCurrency(price || 10000)}</div>
              <div className="line-through decoration-1 text-gray-400">{formatCurrency(35)}</div>
              <div className="text-red-500">(29% off)</div>
            </div>
            <div className="flex gap-[.7rem] text-[.91rem]">
              <div className="text-gray-500 font-300 border px-[.8rem] rounded-[3rem]">10g</div>
              <div className="flex items-center text-gray-500 font-300 border px-[.6rem] rounded-[3rem]">
                <GoDotFill size={15} className="text-red-500" /> <div>Rose</div>
              </div>
            </div>
          </Link>

          {/* Temporary debug info - remove after fixing */}
          {(import.meta.env.MODE === "development") && (
            <div className="text-xs text-gray-500 mb-2">
              <div>ID: {id || "No ID"}</div>
              <div>Auth: {isAuthenticated ? "Yes" : "No"}</div>
              <div>Loading: {isAddingToCart ? "Yes" : "No"}</div>
            </div>
          )}

          <div className="mt-[1rem]">
            <CustomButton
              onClick={handleAddToCart}
              loading={isAddingToCart}
              text={isAuthenticated ? "Add to Bag" : "Login to Add"}
              classNames="hover:bg-primary-deepRed transition-all border border-primary-deepRed w-[100%] text-primary-deepRed hover:text-white px-[1.5rem] py-[.5rem]"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard
