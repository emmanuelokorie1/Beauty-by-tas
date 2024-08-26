import { useState } from "react";
import shopImgTemp from "../../assets/shop/shoptemp.svg";
import { LuDot } from "react-icons/lu";
import ProductCard from "../../Components/ProductCard";
import BackgroundImg from "../../Components/BackgroundImg";

import { useEffect } from "react";
import { fetchCategoryData } from "../../Redux/Slices/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store/store";

// Typed hooks
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;

interface subNav1 {
  categoryname: String;
  categoryid: String;
  createdat?: String;
  status?: boolean;
  productcount?: number | String;
}

function Shop() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchCategoryData("/category/client?type=all"));
  }, [dispatch]);

  console.log(data, status, error);
  const subNav: subNav1[] = data?.categories;

  const [tabNav, setTabNav] = useState<subNav1>(
    data?.categories && data?.categories[0]
  );
  

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
            {subNav && subNav.map((e: subNav1, i: number) => (
              <button
                key={i}
                onClick={() => setTabNav(e)}
                className={
                  "border border-gray-700 rounded-lg text-gray-600 text-[.8rem] px-[1rem] py-[.7rem] capitalize"
                }
                style={{
                  background:
                    e.categoryname === tabNav?.categoryname ? "black" : "",
                  color: e.categoryname === tabNav?.categoryname ? "white" : "",
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default Shop;
