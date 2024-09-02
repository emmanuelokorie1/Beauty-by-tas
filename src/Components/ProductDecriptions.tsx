import React, { useState } from "react";
import productImg from "../assets/ProductDescription/des1.svg";
import productImg2 from "../assets/ProductDescription/des2.svg";
import productImg3 from "../assets/ProductDescription/des3.svg";
import productImg4 from "../assets/ProductDescription/des4.png";
import shipping from "../assets/ProductDescription/shipping.svg";
import policy from "../assets/ProductDescription/return.svg";

import { GoHeart } from "react-icons/go";
import StarReview from "./StarReview";
import CustomButton from "./CustomButton";
import { formatCurrency } from "../utils/CurrencyFormat";

interface CustomReactProps {}

const ProductDecriptions: React.FC<CustomReactProps> = ({}) => {
  const imgNav = [productImg3, productImg, productImg2, productImg4];

  const [imgNavTab, setImgNavTab] = useState(productImg3);
  const [productCount, setProductCount] = useState(1);

  const incrementCount = () => setProductCount((prev) => prev + 1);
  const decrementCount = () =>
    setProductCount((prev) => (prev > 1 ? prev - 1 : prev));

  const amount = 16.13;

  const freeShipping = [
    { name: "Free Shipping from $30", img: shipping },
    { name: "30 days return policy", img: policy },
  ];

  return (
    <>
      <section className="md:flex justify-between containers pt-[2rem]">
        <aside className="flex pb-[2rem] justify-between md:w-[50%] w-[100%] h-fit ">
          {/* Number{productId} */}
          <div className="w-[15%]">
            {imgNav?.map((e, i) => {
              return (
                <div
                  key={i}
                  className="p-[.7rem] sm:w-[80px] w-[60px] sm:h-[80px] h-[60px] rounded-md cursor-pointer m-[.3rem]"
                  style={{
                    border:
                      e === imgNavTab
                        ? "1px solid #ccc"
                        : "1px solid transparent",
                  }}
                  onClick={() => setImgNavTab(e)}
                >
                  <img src={e} alt="logo" className="w-[100%] h-[100%]" />
                </div>
              );
            })}
          </div>

          <div className="p-[.7rem] w-[75%] flex justify-center items-center">
            <div className="s900:w-[230px] w-[200px] s900:h-[230px] h-[200px] flex justify-center items-center transition-all">
              <img
                src={imgNavTab}
                alt="logo"
                className="w-[100%] h-[100%] transition-all"
                // width={300} // Specify the width
                // height={300} // Specify the height
              />
            </div>
          </div>
          <div className="w-[10%] flex justify-center">
            <div className="cursor-pointer text-gray-500 h-fit">
              <GoHeart
                size={30}
                className="hover:text-red-400 transition-all"
              />
            </div>
          </div>
        </aside>
        <aside className="ps-[1rem] md:w-[50%] w-[100%] ">
          <div className="bg-primary-textColor w-fit text-white px-[.5rem] text-[.9rem] transition-all rounded-lg">
            NEW
          </div>
          <div
            className="text-[.9rem] text-gray-500 py-[10px]"
            style={{ fontWeight: "400" }}
          >
            Body Care
          </div>

          <div className="fontdm sm:text-[1.2rem] text-[1rem] text-[#000914]">
            Plum Bodylovin Vanilla Vibes Body Butter - (25g)
          </div>

          <StarReview review={3.7} />

          <div
            className="sm:text-[14px] text-[13px] text-primary-textColor2 py-[10px]"
            style={{ fontWeight: "400" }}
          >
            Protect your skin from dry weather with the Plum Bodylovin Vanilla
            Vibes Body Butter - (25g). 
          </div>

          <div className="flex gap-[.7rem] text-[.88rem] py-[.5rem]">
            <div className=" font-semibold">{formatCurrency(amount * productCount)}</div>
            <div className="line-through decoration-1 text-gray-400">
              {formatCurrency(35)}
            </div>
            <div className="text-red-500">(29% off)</div>
          </div>

          <div className="flex justify-between items-center py-[1rem]">
            <aside className="flex justify-between items-center gap-[10px] rounded-md border border-gray-200 w-[25%]">
              <button
                className={`py-2 w-[35%] hover:bg-gray-200 rounded-md ${
                  productCount === 1 && "cursor-not-allowed"
                }`}
                onClick={decrementCount}
                disabled={productCount === 1}
              >
                -
              </button>
              <div>{productCount}</div>
              <button
                className="py-2 w-[35%] hover:bg-gray-200 rounded-md"
                onClick={incrementCount}
              >
                +
              </button>
            </aside>
            <aside className="w-[70%]">
              <CustomButton
                text={"Add to cart"}
                classNames="bg-primary-deepRed w-[100%] text-white px-[1.5rem] py-[.5rem] cursor-pointer"
              />
            </aside>
          </div>

          <div className="flex justify-between items-center">
            {freeShipping?.map((e, i) => {
              return (
                <div
                  key={i}
                  className="border w-[47%] flex flex-col items-center justify-center  py-[1.3rem] rounded-lg bg-[#F3F3F3]"
                >
                  <div>
                    <img src={e?.img} alt="logo" width={30} height={30} />
                  </div>
                  <div className="pt-3 text-[#313131] text-center sm:text-[14px] text-[12px]">
                    {e?.name}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
    </>
  );
};

export default ProductDecriptions;
