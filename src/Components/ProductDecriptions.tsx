"use client"

import type React from "react"
import { useState, useEffect } from "react"
import shipping from "../assets/ProductDescription/shipping.svg"
import policy from "../assets/ProductDescription/return.svg"
import { GoHeart } from "react-icons/go"
import StarReview from "./StarReview"
import CustomButton from "./CustomButton"
import { formatCurrency } from "../utils/CurrencyFormat"
import { useParams } from "react-router-dom"
import { useProduct } from "../hooks/useProducts"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { toast } from "sonner"

type CustomReactProps = {}

const ProductDecriptions: React.FC<CustomReactProps> = ({}) => {
  const { id } = useParams()
  const { data: product, isLoading, error } = useProduct(id)
  const { addToCart, isAddingToCart } = useCart()
  const { isAuthenticated } = useAuth()

  // State for the main displayed image
  const [imgNavTab, setImgNavTab] = useState<string | null>(null)
  const [productCount, setProductCount] = useState(1)

  useEffect(() => {
    if (product?.images?.length) {
      setImgNavTab(product.images[0]) // Set first image as default
    }
  }, [product])

  const incrementCount = () => setProductCount((prev) => prev + 1)
  const decrementCount = () => setProductCount((prev) => (prev > 1 ? prev - 1 : prev))

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart")
      return
    }

    if (product?.totalStock === 0) return;

    if (product?.productId) {
      // Add the specified quantity to cart
      for (let i = 0; i < productCount; i++) {
        addToCart(product.productId)
      }
      // Reset count after adding to cart
      setProductCount(1)
    } else {
      toast.error("Product information is missing")
    }
  }

  const freeShipping = [
    { name: "Free Shipping from $30", img: shipping },
    { name: "30 days return policy", img: policy },
  ]

  if (isLoading) {
    return (
      <section className="containers pt-[2rem]">
        <div className="animate-pulse">
          <div className="md:flex justify-between">
            <div className="md:w-[50%] w-[100%]">
              <div className="h-[400px] bg-gray-200 rounded"></div>
            </div>
            <div className="md:w-[50%] w-[100%] ps-[1rem]">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="containers pt-[2rem]">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <a
            href="/shop"
            className="bg-primary-deepRed text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Back to Shop
          </a>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="md:flex justify-between containers pt-[2rem]">
        <aside className="flex pb-[2rem] justify-between md:w-[50%] w-[100%] h-fit">
          {/* Thumbnail Images */}
          <div className="w-[15%]">
            {product?.images?.map((e: string, i: number) => (
              <div
                key={i}
                className="p-[.7rem] sm:w-[80px] w-[60px] sm:h-[80px] h-[60px] rounded-md cursor-pointer m-[.3rem]"
                style={{
                  border: e === imgNavTab ? "1px solid #ccc" : "1px solid transparent",
                }}
                onClick={() => setImgNavTab(e)}
              >
                <img
                  src={e || "/placeholder.svg"}
                  alt="Product thumbnail"
                  className="w-[100%] h-[100%] object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* Main Product Image */}
          <div className="p-[.7rem] w-[75%] flex justify-center items-center">
            <div className="s900:w-[400px] w-[300px] s900:h-[400px] h-[300px] flex justify-center items-center transition-all">
              {imgNavTab ? (
                <img
                  src={imgNavTab || "/placeholder.svg"}
                  alt="Product"
                  className="w-[100%] h-[100%] object-cover rounded-lg transition-all"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Loading...</p>
                </div>
              )}
            </div>
          </div>

          {/* Wishlist Icon */}
          <div className="w-[10%] flex justify-center">
            <div className="cursor-pointer text-gray-500 h-fit">
              <GoHeart size={30} className="hover:text-red-400 transition-all" />
            </div>
          </div>
        </aside>

        {/* Product Information */}
        <aside className="ps-[1rem] md:w-[50%] w-[100%]">
          <div className="bg-primary-textColor w-fit text-white px-[.5rem] text-[.9rem] transition-all rounded-lg mb-2">
            {product.status ? "AVAILABLE" : "OUT OF STOCK"}
          </div>

          <div className="fontdm sm:text-[1.8rem] text-[1.4rem] text-[#000914] font-bold mb-2">
            {product?.productname || "Product Name"}
          </div>

          <div className="fontdm sm:text-[1.1rem] text-[1rem] text-[#2c2c2c] mb-4">
            {product?.description || "Product description"}
          </div>

          <div className="mb-4">
            <StarReview review={4.5} />
          </div>

          <div className="flex gap-[.7rem] text-[1.2rem] py-[.5rem] mb-6">
            <div className="font-bold text-primary-deepRed">{formatCurrency((product?.price || 0) * productCount)}</div>
            {product?.price && (
              <div className="line-through text-gray-400">{formatCurrency(product.price * 1.3 * productCount)}</div>
            )}
          </div>

          {/* Stock Information */}
          <div className="mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Stock:</span> {product?.totalStock || 0} available
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Category:</span> {product?.categoryname || "Beauty"}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex justify-between items-center py-[1rem] mb-6">
            <aside className="flex justify-between items-center gap-[10px] rounded-md border border-gray-200 w-[25%]">
              <button
                className={`py-2 w-[35%] hover:bg-gray-200 rounded-md transition-all ${productCount === 1 && "cursor-not-allowed opacity-50"}`}
                onClick={decrementCount}
                disabled={productCount === 1}
              >
                -
              </button>
              <div className="font-semibold">{productCount}</div>
              <button
                className="py-2 w-[35%] hover:bg-gray-200 rounded-md transition-all"
                onClick={incrementCount}
                disabled={productCount >= (product?.totalStock || 0)}
              >
                +
              </button>
            </aside>
            <aside className="w-[70%]">
              <CustomButton
                text={isAuthenticated ? "Add to cart" : "Login to Add"}
                onClick={handleAddToCart}
                loading={isAddingToCart}
                classNames={`w-[100%] text-white px-[1.5rem] py-[.8rem] cursor-pointer transition-all ${
                  product?.totalStock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-deepRed hover:bg-opacity-90"
                }`}
              />
            </aside>
          </div>

          {/* Shipping Information */}
          <div className="flex justify-between items-center">
            {freeShipping?.map((e, i) => (
              <div
                key={i}
                className="border w-[47%] flex flex-col items-center justify-center py-[1.3rem] rounded-lg bg-[#F3F3F3] hover:bg-gray-100 transition-all"
              >
                <div>
                  <img src={e?.img || "/placeholder.svg"} alt="Shipping info" width={30} height={30} />
                </div>
                <div className="pt-3 text-[#313131] text-center sm:text-[14px] text-[12px]">{e?.name}</div>
              </div>
            ))}
          </div>

          {/* Additional Product Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Product Details:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Product ID:</span> {product?.productId}
              </p>
              <p>
                <span className="font-medium">Created:</span>{" "}
                {product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A"}
              </p>
              <p>
                <span className="font-medium">Status:</span> {product?.status ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </>
  )
}

export default ProductDecriptions
