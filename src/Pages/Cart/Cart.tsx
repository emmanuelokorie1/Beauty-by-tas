"use client"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiHeart } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { Modal } from "@arco-design/web-react"
import CustomButton from "../../Components/CustomButton"
import ProductSwipper from "../../Components/ProductSwipper"
import HeaderText from "../../Components/HeaderText"
import ProductCard from "../../Components/ProductCard"
import { useCart } from "../../hooks/useCart"
import { useAuth } from "../../hooks/useAuth"
import { formatCurrency } from "../../utils/CurrencyFormat"
import AddressSelector from "../../Components/AddressSelector"
import { toast } from "sonner"

function Cart() {
  const [showModalIfNotLoggedIn, setShowModalIfNotLoggedIn] = useState<boolean>(false)
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

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

  // Calculate totals
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
    const shipping = subtotal > 5000 ? 0 : 500 // Free shipping over ₦5,000
    const total = subtotal + shipping
    const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)

    return { subtotal, shipping, total, itemCount }
  }, [cartItems])

  const handleIncrementCount = (productId: string, currentQuantity: number) => {
    updateQuantity({ productId, quantity: currentQuantity + 1 })
    toast.success("Quantity updated!")
  }

  const handleDecrementCount = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity({ productId, quantity: currentQuantity - 1 })
      toast.success("Quantity updated!")
    }
  }

  const handleRemoveFromCart = (cartId: string) => {
    removeFromCart(cartId)
    toast.success("Item removed from cart!")
  }

  const handleCheckOut = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!")
      return
    }

    if (user && user.user) {
      setShowAddressModal(true)
    } else {
      setShowModalIfNotLoggedIn(true)
    }
  }

  const handleProcessCheckout = async () => {
    const checkoutData = {
      email: user?.user?.email || "",
      addressId: selectedAddressId,
    }

    checkout(checkoutData)
  }

  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
    toast.success(wishlistItems.includes(productId) ? "Removed from wishlist!" : "Added to wishlist!")
  }

  const data2 = cartItems.map((item) => (
    <ProductCard
      key={item.productId}
      id={item.productId}
      description={item.description}
      productName={item.categoryname}
      price={item.price}
      img={item.images?.[0]}
      totalStock={item.totalStock}
    />
  ))

  const getButtonText = () => {
    if (isCheckingOut) return "Processing..."
    if (checkoutError) return "Try Again"
    return "Proceed to Checkout"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="containers py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-32"></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm h-64"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="containers py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage your items</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiShoppingBag size={16} />
            <span>{cartSummary.itemCount} items</span>
          </div>
        </div>

        {/* Login Modal */}
        <Modal
          visible={showModalIfNotLoggedIn}
          onOk={() => navigate("/auth/login")}
          onCancel={() => setShowModalIfNotLoggedIn(false)}
          title="Login Required"
        >
          <div className="pe-[3rem] boldRebuk text-[1.2rem]">Please login to continue</div>
        </Modal>

        {/* Address Selection Modal */}
        <Modal
          visible={showAddressModal}
          onCancel={() => setShowAddressModal(false)}
          footer={null}
          title="Select Shipping Address"
          style={{ width: 700 }}
        >
          <div className="py-4">
            <AddressSelector onSelect={setSelectedAddressId} selectedAddressId={selectedAddressId} />

            <div className="flex justify-end gap-4 mt-8 border-t pt-4">
              <CustomButton
                text="Cancel"
                onClick={() => setShowAddressModal(false)}
                classNames="border border-gray-300 text-gray-700 px-6 py-2"
              />
              <CustomButton
                text="Continue to Payment"
                onClick={handleProcessCheckout}
                loading={isCheckingOut}
                classNames="bg-primary-deepRed text-white px-6 py-2"
              />
            </div>
          </div>
        </Modal>

        {/* Error Display */}
        {checkoutError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl mb-4 sm:mb-6 flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="text-sm sm:text-base">
              <strong>Checkout Error:</strong> {checkoutError.message || "Something went wrong. Please try again."}
            </div>
          </div>
        )}

        {/* Empty Cart Message */}
        {cartItems.length === 0 && (
          <div className="text-center py-8 sm:py-16 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FiShoppingBag size={24} className="sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200 text-sm sm:text-base"
            >
              <FiShoppingBag size={14} className="sm:w-4 sm:h-4" />
              Start Shopping
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Cart Items</h2>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.cartId || item.productId} className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      {/* Product Image */}
                      <div className="w-full sm:w-20 h-[300px] sm:h-20 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          src={item.images?.[0] || "/placeholder.svg"}
                          alt={item.description}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 capitalize text-sm sm:text-base truncate">{item.categoryname}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-start">
                            <button
                              onClick={() => toggleWishlist(item.productId)}
                              className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${
                                wishlistItems.includes(item.productId)
                                  ? 'bg-pink-100 text-pink-600'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <FiHeart size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveFromCart(item.cartId || item.productId)}
                              className="p-1.5 sm:p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                            >
                              <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                          <div className="text-base sm:text-lg font-bold text-pink-600">
                            {formatCurrency(item.price * (item.quantity || 1))}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-start">
                            <button
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                              onClick={() => handleDecrementCount(item.cartId, item.quantity || 1)}
                              disabled={(item.quantity || 1) === 1 || isUpdatingQuantity}
                            >
                              <FaMinus size={10} className="sm:w-3 sm:h-3" />
                            </button>
                            <span className="w-10 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">
                              {item.quantity || 1}
                            </span>
                            <button
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                              onClick={() => handleIncrementCount(item.cartId, item.quantity || 1)}
                              disabled={isUpdatingQuantity}
                            >
                              <FaPlus size={10} className="sm:w-3 sm:h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Order Summary</h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(cartSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {cartSummary.shipping === 0 ? 'Free' : formatCurrency(cartSummary.shipping)}
                    </span>
                  </div>
                  {cartSummary.shipping > 0 && (
                    <div className="text-xs sm:text-sm text-green-600 bg-green-50 p-2 sm:p-3 rounded-lg">
                      Add ₦{5000 - cartSummary.subtotal} more for free shipping!
                    </div>
                  )}
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>{formatCurrency(cartSummary.total)}</span>
                    </div>
                  </div>
                </div>

                <CustomButton
                  text={getButtonText()}
                  onClick={handleCheckOut}
                  loading={isCheckingOut}
                  classNames={`w-full py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                    isCheckingOut
                      ? "bg-gray-400 cursor-not-allowed"
                      : checkoutError
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-200"
                  }`}
                />

                <div className="mt-3 sm:mt-4 text-center">
                  <Link 
                    to="/shop" 
                    className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {cartItems.length > 0 && (
          <section className="mt-8 sm:mt-16">
            <HeaderText title="You Might Also Like" />
            <ProductSwipper data={data2} />
          </section>
        )}
      </div>
    </div>
  )
}

export default Cart
