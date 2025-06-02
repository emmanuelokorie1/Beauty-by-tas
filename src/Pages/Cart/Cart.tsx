"use client"

import React from "react"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Modal } from "@arco-design/web-react"
import CustomButton from "../../Components/CustomButton"
import ProductSwipper from "../../Components/ProductSwipper"
import HeaderText from "../../Components/HeaderText"
import ProductCard from "../../Components/ProductCard"
import { useCart } from "../../hooks/useCart"
import { useAuth } from "../../hooks/useAuth"
import { formatCurrency } from "../../utils/CurrencyFormat"

function Cart() {
  const [showModalIfNotLoggedIn, setShowModalIfNotLoggedIn] = useState<boolean>(false)

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    checkout,
    isLoading,
    isCheckingOut,
    isUpdatingQuantity,
    checkoutError,
  } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)

  const handleIncrementCount = (productId: string, currentQuantity: number) => {
    updateQuantity({ productId, quantity: currentQuantity + 1 })
  }

  const handleDecrementCount = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity({ productId, quantity: currentQuantity - 1 })
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const handleCheckOut = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }

    if (user && user.user) {
      handleProcessCheckout()
    } else {
      setShowModalIfNotLoggedIn(true)
    }
  }

  const handleProcessCheckout = async () => {
    const checkoutData = {
      email: user?.user?.email || "",
      name: user?.user?.name || "",
      userId: user?.user?.id || user?.user?.userId || "",
      address: "",
      state: "",
      city: "",
      country: "",
      items: cartItems.map((item) => ({
        productId: item.productid,
        quantity: item.quantity || 1,
        price: item.price,
        name: item.description,
        categoryname: item.categoryname,
        image: item.images?.[0] || "",
      })),
      totalAmount: totalAmount,
      orders: [],
    }

    checkout(checkoutData)
  }

  const data2 = cartItems.map((item) => (
    <ProductCard
      key={item.productid}
      id={item.productid}
      description={item.description}
      productName={item.categoryname}
      price={item.price}
      img={item.images?.[0]}
    />
  ))

  const getButtonText = () => {
    if (isCheckingOut) return "Processing..."
    if (checkoutError) return "Try Again"
    return "Checkout"
  }

  if (isLoading) {
    return (
      <div className="containers">
        <div className="text-gray-700 py-[1.5rem]">My Cart</div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="containers">
      <div className="text-gray-700 py-[1.5rem]">My Cart</div>

      {/* Login Modal */}
      <Modal
        visible={showModalIfNotLoggedIn}
        onOk={() => navigate("/auth/login")}
        onCancel={() => setShowModalIfNotLoggedIn(false)}
        title="Login Required"
      >
        <div className="pe-[3rem] boldRebuk text-[1.2rem]">Please login to continue</div>
      </Modal>

      {/* Error Display */}
      {checkoutError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {checkoutError.message || "Checkout failed"}
        </div>
      )}

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
          <Link to="/shop" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <section className="s900:flex justify-between gap-[2rem]">
          <aside className="s900:w-[65%] w-[100%] border rounded-md p-[1.6rem] mb-[2rem] s900:mb-0">
            <div className="flex justify-between items-center border-b">
              <div className="fontdm sm:text-[2rem] text-[1.3rem]">My Cart</div>
              <div className="text-sm text-gray-500">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </div>
            </div>

            {cartItems.map((item) => (
              <div key={item.productid} className="flex my-[1rem] border-b">
                <aside className="w-[15%]">
                  <div className="h-[100px] overflow-hidden">
                    <img
                      src={item.images?.[0] || "/placeholder.svg"}
                      alt={item.description}
                      className="w-[100%] h-full rounded-md object-cover"
                    />
                  </div>
                </aside>
                <aside className="ps-[1rem] w-[85%]">
                  <div className="text-gray-700 capitalize">{item.categoryname}</div>
                  <div className="fontdm sm:text-[1.1rem] text-[.97rem]">{item.description}</div>
                  <div className="font-bold pt-[1rem]">
                    {formatCurrency(item.price * (item.quantity || 1))}
                  </div>

                  <div className="flex justify-between items-end py-[1rem]">
                    <div
                      className="text-primary-deepRed cursor-pointer font-bold hover:underline"
                      onClick={() => handleRemoveFromCart(item.productid)}
                    >
                      Remove
                    </div>
                    <aside className="flex justify-between items-center gap-[10px] rounded-md border border-gray-200 md:w-[35%] w-[50%]">
                      <button
                        className="py-2 w-[35%] hover:bg-gray-200 rounded-md flex justify-center sm:text-[1.3rem] text-[1rem] disabled:opacity-50"
                        onClick={() => handleDecrementCount(item.productid, item.quantity || 1)}
                        disabled={(item.quantity || 1) === 1 || isUpdatingQuantity}
                      >
                        <FaMinus />
                      </button>
                      <div className="sm:text-[1.1rem] text-[1rem] font-semibold">{item.quantity || 1}</div>
                      <button
                        className="py-2 w-[35%] hover:bg-gray-200 flex justify-center rounded-md sm:text-[1.3rem] text-[1rem] disabled:opacity-50"
                        onClick={() => handleIncrementCount(item.productid, item.quantity || 1)}
                        disabled={isUpdatingQuantity}
                      >
                        <FaPlus />
                      </button>
                    </aside>
                  </div>
                </aside>
              </div>
            ))}
          </aside>

          <aside className="s900:w-[35%] w-[100%] border rounded-md p-[1.5rem]">
            <div className="fontdm sm:text-[1.7rem] text-[1.2rem] border-b">Order Summary</div>

            <div className="sm:text-[.95rem] text-[.85rem] pt-[.6rem]">
              <div className="flex justify-between">
                <div className="text-gray-700">Subtotal (USD)</div>
                <div className="font-bold">{formatCurrency(totalAmount)}</div>
              </div>
              <div className="flex justify-between py-[.6rem]">
                <div className="text-gray-700">Items</div>
                <div className="font-bold">{cartItems.length}</div>
              </div>
            </div>

            <div className="flex justify-between py-[.8rem] border-t">
              <div className="font-bold">{`Total Amount (USD)`}</div>
              <div className="font-bold">{formatCurrency(totalAmount)}</div>
            </div>

            <CustomButton
              text={getButtonText()}
              onClick={handleCheckOut}
              loading={isCheckingOut}
              classNames={`py-[.6rem] px-[1.3rem] w-[100%] ${
                isCheckingOut
                  ? "bg-gray-400 cursor-not-allowed"
                  : checkoutError
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary-color"
              }`}
            />
          </aside>
        </section>
      )}

      {cartItems.length > 0 && (
        <section className="pt-[5rem]">
          <HeaderText title="Related Products" />
          <ProductSwipper data={data2} />
        </section>
      )}
    </div>
  )
}

export default Cart
