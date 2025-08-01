"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiHeart, FiShare2, FiStar, FiTruck, FiShield } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
import ProductDecriptions from "../../Components/ProductDecriptions"
import { useProduct } from "../../hooks/useProducts"
import CustomButton from "../../Components/CustomButton"
import { formatCurrency } from "../../utils/CurrencyFormat"

function Bag() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useProduct(id)
  const [tabNavState, setTabNavState] = useState("OVERVIEW")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const tabNav = [
    { id: "OVERVIEW", label: "Overview", icon: "📋" },
    { id: "HOW TO USE", label: "How to Use", icon: "✨" },
    { id: "INGREDIENTS", label: "Ingredients", icon: "🧪" },
    { id: "BENEFITS", label: "Benefits", icon: "💎" },
    { id: "SUSTAINABLE PACKAGING", label: "Sustainability", icon: "🌱" }
  ]

  // Auto-scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tabNavState])

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="containers py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <CustomButton
            text="Back to Shop"
            onClick={() => navigate("/shop")}
            classNames="bg-primary-deepRed text-white px-8 py-3 rounded-lg hover:bg-primary-deepRed/90 transition-all"
          />
        </div>
      </div>
    )
  }

  // No product found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Available</h2>
          <p className="text-gray-600 mb-8">This product is currently not available.</p>
          <CustomButton
            text="Back to Shop"
            onClick={() => navigate("/shop")}
            classNames="bg-primary-deepRed text-white px-8 py-3 rounded-lg hover:bg-primary-deepRed/90 transition-all"
          />
        </div>
      </div>
    )
  }

  const productImages = product.images || [product.images?.[0]]

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product.totalStock || 1)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} of ${product.productname} to cart`)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.productname,
        text: product.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // Render product details content based on selected tab
  const renderTabContent = () => {
    switch (tabNavState) {
      case "OVERVIEW":
        return (
          <div className="py-8 space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📋</span> Product Overview
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description ||
                  "Experience the perfect blend of quality and elegance with this premium product. Carefully crafted to meet your beauty needs and enhance your natural radiance."}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">✨ Key Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-deepRed rounded-full"></div>
                    <span className="text-gray-700">Premium quality ingredients</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-deepRed rounded-full"></div>
                    <span className="text-gray-700">Long-lasting formula</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-deepRed rounded-full"></div>
                    <span className="text-gray-700">Suitable for all skin types</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-deepRed rounded-full"></div>
                    <span className="text-gray-700">Cruelty-free and ethically sourced</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">📊 Product Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Stock Available:</span>
                    <span className="font-semibold text-gray-800">{product.totalStock || 0} units</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Category:</span>
                    <span className="font-semibold text-gray-800">{product.categoryname || "Beauty"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Product ID:</span>
                    <span className="font-semibold text-gray-800">{product.productId}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">Price:</span>
                    <span className="font-bold text-xl text-primary-deepRed">{formatCurrency(product.price || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "HOW TO USE":
        return (
          <div className="py-8 space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>✨</span> How to Use
              </h3>
              <p className="text-gray-700">Follow these simple steps for the best results with your product.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Preparation",
                  description: "Ensure your skin is clean and dry before application. Remove any existing makeup or skincare products.",
                  icon: "🧼"
                },
                {
                  step: "2", 
                  title: "Application",
                  description: "Apply a small amount of product evenly across the desired area. Use gentle, circular motions for best results.",
                  icon: "✨"
                },
                {
                  step: "3",
                  title: "Finishing", 
                  description: "Allow the product to set for a few minutes. For best results, avoid touching the area immediately after application.",
                  icon: "💫"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-deepRed text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-400">
              <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                <span>💡</span> Pro Tips
              </h4>
              <ul className="space-y-2 text-yellow-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Use sparingly - a little goes a long way
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Store in a cool, dry place
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Always patch test before first use
                </li>
              </ul>
            </div>
          </div>
        )

      case "INGREDIENTS":
        return (
          <div className="py-8 space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🧪</span> Ingredients
              </h3>
              <p className="text-gray-700">Discover the natural and effective ingredients that make this product special.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">🌟 Active Ingredients</h4>
                <div className="space-y-3">
                  {[
                    { name: "Vitamin E", benefit: "Antioxidant protection" },
                    { name: "Hyaluronic Acid", benefit: "Deep hydration" },
                    { name: "Natural Oils", benefit: "Nourishment" },
                    { name: "Plant Extracts", benefit: "Soothing properties" }
                  ].map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-800">{ingredient.name}</span>
                      <span className="text-sm text-gray-600">{ingredient.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">🌿 Natural Extracts</h4>
                <div className="space-y-3">
                  {[
                    { name: "Aloe Vera", benefit: "Calming effect" },
                    { name: "Chamomile", benefit: "Anti-inflammatory" },
                    { name: "Green Tea", benefit: "Antioxidant boost" },
                    { name: "Jojoba Oil", benefit: "Moisturizing" }
                  ].map((extract, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-800">{extract.name}</span>
                      <span className="text-sm text-gray-600">{extract.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h4 className="font-bold text-green-800 mb-2">Clean Beauty Promise</h4>
                  <p className="text-green-700">
                    Free from parabens, sulfates, phthalates, and synthetic fragrances. Cruelty-free and ethically sourced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "BENEFITS":
        return (
          <div className="py-8 space-y-6">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💎</span> Benefits
              </h3>
              <p className="text-gray-700">Experience the amazing benefits that this product brings to your beauty routine.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Long-lasting Results",
                  description: "Enjoy all-day wear with our advanced formula that stays put through any activity.",
                  icon: "⏰"
                },
                {
                  title: "Skin-friendly Formula",
                  description: "Gentle on all skin types, including sensitive skin. Dermatologically tested.",
                  icon: "🤗"
                },
                {
                  title: "Easy Application",
                  description: "Smooth, effortless application that blends seamlessly for a natural finish.",
                  icon: "✨"
                },
                {
                  title: "Versatile Use",
                  description: "Perfect for both everyday wear and special occasions. Buildable coverage.",
                  icon: "🎭"
                },
                {
                  title: "Premium Quality",
                  description: "Made with the finest ingredients for superior performance and results.",
                  icon: "👑"
                },
                {
                  title: "Value for Money",
                  description: "A little goes a long way, making this an economical choice for daily use.",
                  icon: "💰"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "SUSTAINABLE PACKAGING":
        return (
          <div className="py-8 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🌱</span> Sustainable Packaging
              </h3>
              <p className="text-gray-700">Join us in our commitment to protecting the environment through sustainable practices.</p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <h4 className="font-bold text-green-800 mb-6 text-xl">Our Environmental Commitment</h4>
              <p className="text-green-700 mb-6 text-lg">
                At BeautyByTas, we're committed to reducing our environmental impact through innovative, sustainable packaging solutions.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-bold text-green-800 mb-4 text-lg">♻️ Eco-Friendly Materials</h5>
                  <ul className="space-y-3">
                    {[
                      "Recyclable containers",
                      "Biodegradable outer packaging", 
                      "Minimal plastic usage",
                      "Soy-based inks for printing"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-bold text-green-800 mb-4 text-lg">🌍 Sustainability Features</h5>
                  <ul className="space-y-3">
                    {[
                      "Refillable options available",
                      "Compact design reduces waste",
                      "Carbon-neutral shipping",
                      "Recycling program participation"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-3">How You Can Help:</h4>
              <p className="text-blue-700">
                Please recycle the packaging after use. Check with your local recycling center for specific guidelines. 
                Consider participating in our refill program to reduce waste even further.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Description Component */}
      <ProductDecriptions />

      {/* Product Details Section */}
      <section className="containers py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={productImages[selectedImage] || productImages[0]}
                alt={product.productname}
                className="w-full h-full object-cover"
              />
            </div>
            
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary-deepRed shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.productname} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.productname}</h1>
              <p className="text-gray-600 mb-4">{product.categoryname}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8 • 127 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary-deepRed">
                  {formatCurrency(product.price || 0)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency((product.price || 0) * 1.2)}
                </span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                  20% OFF
                </span>
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${
                  (product.totalStock || 0) > 10 ? 'bg-green-500' : 
                  (product.totalStock || 0) > 0 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  {(product.totalStock || 0) > 10 ? 'In Stock' : 
                   (product.totalStock || 0) > 0 ? 'Low Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product.totalStock || 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CustomButton
                  text="Add to Cart"
                  onClick={handleAddToCart}
                  classNames="flex-1 bg-primary-deepRed text-white py-3 rounded-lg hover:bg-primary-deepRed/90 transition-all font-medium"
                />
                <button
                  onClick={handleWishlist}
                  className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  {isWishlisted ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <FiHeart className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  <FiShare2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                <FiTruck className="w-6 h-6 text-primary-deepRed mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                <FiShield className="w-6 h-6 text-primary-deepRed mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">Secure Payment</p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="containers pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              {tabNav.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTabNavState(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${
                    tabNavState === tab.id
                      ? "text-primary-deepRed border-b-2 border-primary-deepRed bg-primary-deepRed/5"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Bag
