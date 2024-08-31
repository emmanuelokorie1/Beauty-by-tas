import { useState } from "react";
import shopImgTemp from "../../assets/shop/shoptemp.svg";
import { LuDot } from "react-icons/lu";
import ProductCard from "../../Components/ProductCard";
import BackgroundImg from "../../Components/BackgroundImg";

import { useEffect } from "react";
import {
  fetchCategoryData,
  fetchProductsData,
} from "../../Redux/Slices/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store/store";
import EmptyComponent from "../../Reuseables/EmptyComponent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CategoryType, ProductType } from "../../types/commonTypes";

// Typed hooks
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;

function Shop() {
  const dispatch = useAppDispatch();
  const {
    categories,
    products,
    // categoryStatus,
    productStatus,
    // categoryError,
    // productError,
  } = useAppSelector((state) => state.data);
  

  useEffect(() => {
    dispatch(fetchCategoryData("/category/client?type=all"));
  }, [dispatch]);

  const subNav: CategoryType[] = categories;

  const [tabNav, setTabNav] = useState<CategoryType>(categories && categories[0]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      dispatch(fetchProductsData(`/category/${tabNav?.categoryid}/products/`));
    }
  }, [dispatch, categories, tabNav?.categoryid]);

  // const SortBy = [
  //   { value: "relevance", label: "Relevance" },
  //   { value: "newest", label: "Newest" },
  //   { value: "best seller", label: "Best Seller" },
  //   { value: "price low - high", label: "Price Low - High" },
  // ];

  return (
    <div>
      <BackgroundImg img={shopImgTemp} header={tabNav?.categoryname} />

      <section className={"containers py-[1rem]"}>
        <div className="flex gap-[.3rem] items-center py-[1rem]">
          <div className="font-semibold text-[.9rem]">Shop</div>
          <div>
            <LuDot />
          </div>
          <div className="text-[.85rem] text-gray-600 capitalize">
            {tabNav?.categoryname}
          </div>
        </div>

        <div className="text-black">Our Categories</div>
        <section
          className="flex justify-between items-center"
          style={{ paddingTop: "8px" }}
        >
          <div className="flex gap-[1rem] s900:w-[50%] w-[70%] flex-wrap">
            {subNav &&
              subNav.map((e: CategoryType, i: number) => (
                <button
                  key={i}
                  onClick={() => setTabNav(e)}
                  className={
                    "border border-gray-700 rounded-lg text-gray-600 text-[.8rem] px-[1rem] py-[.7rem] capitalize"
                  }
                  style={{
                    background:
                      e.categoryname === tabNav?.categoryname ? "black" : "",
                    color:
                      e.categoryname === tabNav?.categoryname ? "white" : "",
                  }}
                >
                  {e.categoryname}
                </button>
              ))}
          </div>
          <div className="flex items-center gap-[1rem]">
            <div className="text-gray-500 text-[.95rem]">Sort by:</div>
            {/* <CustomReact classNames="w-[200px]" data={SortBy} title="filter" /> */}
          </div>
        </section>
      </section>

      <div className="containers grid s1100:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[1rem] py-[1rem]">
        {productStatus === "loading" ? (
          <div className="col-span-full flex justify-center items-center">
            <Skeleton className="w-full h-[250px] bg-black z-50" />
          </div>
        ) : products?.length > 0 ? (
          products.map((e: ProductType, i: number) => {
            return (
              <div key={i}>
                <ProductCard
                  productName={e?.productname}
                  description={e?.description}
                  price={e?.price}
                  loading={false}
                  img={e?.images && e?.images[i]}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <EmptyComponent />
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
