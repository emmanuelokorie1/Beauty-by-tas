import React, { useState, useEffect } from "react";
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
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosinstance';

interface CustomReactProps {}

const ProductDecriptions: React.FC<CustomReactProps> = ({}) => {
  const [pdata, setPdata] = useState<any>(null);
  const { id } = useParams();
  
  // State for the main displayed image
  const [imgNavTab, setImgNavTab] = useState<string | null>(null);
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/product/details/client/${id}`);
        const data = response.data;
        setPdata(data?.results);

        // Set the default image after data has been fetched
        if (data?.results?.images?.length) {
          setImgNavTab(data.results.images[0]); // Set first image as default
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const incrementCount = () => setProductCount((prev) => prev + 1);
  const decrementCount = () =>
    setProductCount((prev) => (prev > 1 ? prev - 1 : prev));

  const amount = pdata?.price;
  const freeShipping = [
    { name: "Free Shipping from $30", img: shipping },
    { name: "30 days return policy", img: policy },
  ];

  return (
    <>
      <section className="md:flex justify-between containers pt-[2rem]">
        <aside className="flex pb-[2rem] justify-between md:w-[50%] w-[100%] h-fit">
          <div className="w-[15%]">
            {pdata?.images?.map((e: string, i: number) => (
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
            ))}
          </div>

          <div className="p-[.7rem] w-[75%] flex justify-center items-center">
            <div className="s900:w-[230px] w-[200px] s900:h-[230px] h-[200px] flex justify-center items-center transition-all">
              {/* Fallback image if imgNavTab is null */}
              {imgNavTab ? (
                <img
                  src={imgNavTab}
                  alt="Product"
                  className="w-[100%] h-[100%] transition-all"
                />
              ) : (
                <p>Loading...</p> // Fallback content while image loads
              )}
            </div>
          </div>
          <div className="w-[10%] flex justify-center">
            <div className="cursor-pointer text-gray-500 h-fit">
              <GoHeart size={30} className="hover:text-red-400 transition-all" />
            </div>
          </div>
        </aside>
        
        <aside className="ps-[1rem] md:w-[50%] w-[100%] ">
          {/* Rest of the product details */}
          <div className="bg-primary-textColor w-fit text-white px-[.5rem] text-[.9rem] transition-all rounded-lg">
            NEW
          </div>

          {/* Product description, price, reviews, etc. */}
          <div className="fontdm sm:text-[1.2rem] text-[1rem] text-[#000914]">
            {pdata?.productname}
          </div>
          <div className="fontdm sm:text-[1.2rem] text-[1rem] text-[#2c2c2c]">
            <small>{pdata?.description}</small>
          </div>
          <StarReview review={3.7} />
          <div className="flex gap-[.7rem] text-[.88rem] py-[.5rem]">
            <div className=" font-semibold">
              {formatCurrency(amount * productCount)}
            </div>
            {/* <div className="line-through decoration-1 text-gray-400">
              {formatCurrency(35)}
            </div>
            <div className="text-red-500">(29% off)</div> */}
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
            {freeShipping?.map((e, i) => (
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
            ))}
          </div>
        </aside>
      </section>
    </>
  );
};

export default ProductDecriptions;
