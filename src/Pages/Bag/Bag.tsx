"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import ProductDecriptions from "../../Components/ProductDecriptions"
import HeaderText from "../../Components/HeaderText"
import ProductSwipper from "../../Components/ProductSwipper"
import ProductCard from "../../Components/ProductCard"
import { useProduct } from "../../hooks/useProducts"
import Loading from "../../Components/Loading"

function Bag() {
  const { id } = useParams()
  const { data: product, isLoading, error } = useProduct(id)

  const CardData = [
    <ProductCard key="1" width="100%" />,
    <ProductCard key="2" width="100%" />,
    <ProductCard key="3" width="100%" />,
    <ProductCard key="4" width="100%" />,
    <ProductCard key="5" width="100%" />,
    <ProductCard key="6" width="100%" />,
  ]

  const tabNav = ["OVERVIEW", "HOW TO USE", "INGREDIENTS", "BENEFITS", "SUSTAINABLE PACKAGING"]

  const [tabNavState, setTabNavState] = useState("OVERVIEW")

  // Loading state
  if (isLoading) {
    return <Loading />
  }

  // Error state
  if (error) {
    return (
      <div className="containers py-[3rem]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <a
            href="/shop"
            className="bg-primary-deepRed text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  // No product found
  if (!product) {
    return (
      <div className="containers py-[3rem]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Available</h2>
          <p className="text-gray-600 mb-8">This product is currently not available.</p>
          <a
            href="/shop"
            className="bg-primary-deepRed text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
          >
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  // Render product details content based on selected tab
  const renderTabContent = () => {
    switch (tabNavState) {
      case "OVERVIEW":
        return (
          <div className="py-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Product Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description ||
                "Experience the perfect blend of quality and elegance with this premium product. Carefully crafted to meet your beauty needs and enhance your natural radiance."}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Premium quality ingredients</li>
                  <li>• Long-lasting formula</li>
                  <li>• Suitable for all skin types</li>
                  <li>• Cruelty-free and ethically sourced</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Product Details:</h4>
                <div className="space-y-1 text-gray-700">
                  <p>
                    <span className="font-medium">Stock:</span> {product.totalStock || 0} available
                  </p>
                  <p>
                    <span className="font-medium">Category:</span> {product.categoryname || "Beauty"}
                  </p>
                  <p>
                    <span className="font-medium">Product ID:</span> {product.productId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "HOW TO USE":
        return (
          <div className="py-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">How to Use</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Step 1: Preparation</h4>
                <p>
                  Ensure your skin is clean and dry before application. Remove any existing makeup or skincare products.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 2: Application</h4>
                <p>
                  Apply a small amount of product evenly across the desired area. Use gentle, circular motions for best
                  results.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 3: Finishing</h4>
                <p>
                  Allow the product to set for a few minutes. For best results, avoid touching the area immediately
                  after application.
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Pro Tips:</h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Use sparingly - a little goes a long way</li>
                  <li>• Store in a cool, dry place</li>
                  <li>• Always patch test before first use</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case "INGREDIENTS":
        return (
          <div className="py-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Ingredients</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">Key Ingredients:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Active Ingredients:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Vitamin E - Antioxidant protection</li>
                    <li>• Hyaluronic Acid - Deep hydration</li>
                    <li>• Natural Oils - Nourishment</li>
                    <li>• Plant Extracts - Soothing properties</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Natural Extracts:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Aloe Vera - Calming effect</li>
                    <li>• Chamomile - Anti-inflammatory</li>
                    <li>• Green Tea - Antioxidant boost</li>
                    <li>• Jojoba Oil - Moisturizing</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded border-l-4 border-green-500">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-green-700">Clean Beauty Promise:</span>
                  Free from parabens, sulfates, phthalates, and synthetic fragrances. Cruelty-free and ethically
                  sourced.
                </p>
              </div>
            </div>
          </div>
        )

      case "BENEFITS":
        return (
          <div className="py-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Benefits</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-deepRed rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Long-lasting Results</h4>
                    <p className="text-gray-600">
                      Enjoy all-day wear with our advanced formula that stays put through any activity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-deepRed rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Skin-friendly Formula</h4>
                    <p className="text-gray-600">
                      Gentle on all skin types, including sensitive skin. Dermatologically tested.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-deepRed rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Easy Application</h4>
                    <p className="text-gray-600">
                      Smooth, effortless application that blends seamlessly for a natural finish.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-deepRed rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Versatile Use</h4>
                    <p className="text-gray-600">
                      Perfect for both everyday wear and special occasions. Buildable coverage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-deepRed rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Premium Quality</h4>
                    <p className="text-gray-600">
                      Made with the finest ingredients for superior performance and results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-deepRed rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Value for Money</h4>
                    <p className="text-gray-600">
                      A little goes a long way, making this an economical choice for daily use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "SUSTAINABLE PACKAGING":
        return (
          <div className="py-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Sustainable Packaging</h3>
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">Our Environmental Commitment</h4>
                <p className="text-green-700 mb-4">
                  At BeautyByTas, we're committed to reducing our environmental impact through innovative, sustainable
                  packaging solutions.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Eco-Friendly Materials:</h5>
                    <ul className="space-y-1 text-green-700">
                      <li>• Recyclable containers</li>
                      <li>• Biodegradable outer packaging</li>
                      <li>• Minimal plastic usage</li>
                      <li>• Soy-based inks for printing</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Sustainability Features:</h5>
                    <ul className="space-y-1 text-green-700">
                      <li>• Refillable options available</li>
                      <li>• Compact design reduces waste</li>
                      <li>• Carbon-neutral shipping</li>
                      <li>• Recycling program participation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">How You Can Help:</h4>
                <p className="text-gray-700">
                  Please recycle the packaging after use. Check with your local recycling center for specific
                  guidelines. Consider participating in our refill program to reduce waste even further.
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      {/* Product Description Component */}
      <ProductDecriptions />

      {/* Product Details Tabs */}
      <section className="mt-[6rem] containers">
        <div>
          <div className="flex md:justify-evenly justify-between flex-wrap md:px-[3rem] border-b ">
            {tabNav?.map((e, i) => {
              return (
                <div
                  onClick={() => setTabNavState(e)}
                  key={i}
                  className={`cursor-pointer px-[.5rem] md:text-[.9rem] text-[.8rem] transition-all py-[.5rem] ${
                    e === tabNavState
                      ? "border-b-[2px] border-primary-deepRed text-primary-deepRed font-semibold"
                      : "text-primary-textColor2 border-b-[2px] border-transparent"
                  }`}
                >
                  {e}
                </div>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">{renderTabContent()}</div>
      </section>

      {/* Similar Products */}
      <section className="containers py-[2rem]">
        <HeaderText title="Similar Products" />
        <ProductSwipper data={CardData} />
      </section>
    </div>
  )
}

export default Bag
