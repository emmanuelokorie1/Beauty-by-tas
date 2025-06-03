"use client"

import { useState, useEffect } from "react"
import shopImgTemp from "../../assets/shop/shoptemp.svg"
import { LuDot } from "react-icons/lu"
import ProductCard from "../../Components/ProductCard"
import BackgroundImg from "../../Components/BackgroundImg"
import EmptyComponent from "../../Reuseables/EmptyComponent"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import type { CategoryType, ProductType } from "../../types/commonTypes"
import { useCategories } from "../../hooks/useCategories"
import { useProducts } from "../../hooks/useProducts"

function Shop() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)

  const { data: products = [], isLoading: productsLoading } = useProducts(selectedCategory?.categoryid)

  // Set first category as default when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory])

  if (categoriesLoading) {
    return (
      <div>
        <BackgroundImg img={shopImgTemp} header="Loading..." />
        <div className="containers py-[2rem]">
          <Skeleton height={40} className="mb-4" />
          <Skeleton height={200} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <BackgroundImg img={shopImgTemp} header={selectedCategory?.categoryname || "Shop"} />

      <section className={"containers py-[1rem]"}>
        <div className="flex gap-[.3rem] items-center py-[1rem]">
          <div className="font-semibold text-[.9rem]">Shop</div>
          <div>
            <LuDot />
          </div>
          <div className="text-[.85rem] text-gray-600 capitalize">{selectedCategory?.categoryname}</div>
        </div>

        <div className="text-black">Our Categories</div>

        <section className="flex justify-between items-center" style={{ paddingTop: "8px" }}>
          <div className="flex gap-[1rem] s900:w-[50%] w-[70%] flex-wrap">
            {categories.map((category: CategoryType, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={
                  "border border-gray-700 rounded-lg text-gray-600 text-[.8rem] px-[1rem] py-[.7rem] capitalize"
                }
                style={{
                  background: category.categoryname === selectedCategory?.categoryname ? "black" : "",
                  color: category.categoryname === selectedCategory?.categoryname ? "white" : "",
                }}
              >
                {category.categoryname}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[1rem]">
            <div className="text-gray-500 text-[.95rem]">Sort by:</div>
          </div>
        </section>
      </section>

      <div className="containers grid s1100:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[1rem] py-[1rem]">
        {productsLoading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductCard key={i} loading={true} />)
        ) : products?.length > 0 ? (
          products.map((product: ProductType, i: number) => (
            <div key={i}>
              <ProductCard
                id={product?.productId}
                productName={product?.productname}
                description={product?.description}
                price={product?.price}
                loading={false}
                img={product?.images?.[0]}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <EmptyComponent />
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
