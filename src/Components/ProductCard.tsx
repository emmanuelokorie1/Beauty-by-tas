"use client";
import React from "react";
import { GoHeart } from "react-icons/go";
import productImg from "../assets/product.png";
import { GoDotFill } from "react-icons/go";
import CustomButton from "./CustomButton";
import Skeleton from "react-loading-skeleton";
import { formatCurrency } from "../utils/CurrencyFormat";
import { Link } from "react-router-dom";

interface customProps {
  classContainer?: String;
  classLoading?: String;
  width?: String;
  img?: any;
  loading?: boolean;

  description?: String;
  productName?: String;
  price?: number | String;
  id?: String;
}

const ProductCard: React.FC<customProps> = ({
  classContainer,
  classLoading,
  width,
  img,
  loading,
  description,
  productName,
  price,
  id,
}) => {
  return (
    <>
      {loading ? (
        <div
          className={`flex flex-col space-y-2 border border-gray-200 p-[.5rem] rounded-lg w-[${
            width || "24%"
          }]  ${classLoading}`}
        >
          <></>
          {/* <Skeleton
            loading={loading}
            text={{ width: "90%" }}
            image={{ shape: "circle" }}
            animation
          ></Skeleton> */}
          <Skeleton containerClassName="w-[100%] h-[180px] rounded-lg" />
          <Skeleton containerClassName="w-[40%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[90%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[70%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[50%] h-[20px] rounded-lg" />
          <Skeleton containerClassName="w-[100%] h-[30px] rounded-lg" />
        </div>
      ) : (
        <div
          className={`w-[${
            width || "24%"
          }] ${classContainer} p-[1rem] my-[1rem] box-border border border-primary-deepRed border-opacity-[0.3] rounded-lg hover:shadow-lg transition-all`}
        >
          <div className="flex items-center justify-between">
              <div className="bg-primary-textColor text-white px-[.5rem] text-[.9rem] transition-all rounded-lg">
                NEW
              </div>
              <div className="cursor-pointer text-primary-textColor">
                <GoHeart
                  className="hover:text-[red] transition-all-3s"
                  size={30}
                />
              </div>
            </div>
            
          <Link to={`/description/${id || 1}`}>
            

            <div className="flex justify-center items-center  py-2">
              <div className=" py-2 h-[250px] w-full">
                <img
                  src={img || productImg}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="text-[.85rem] text-[#555B62]">
              {productName || "Lip Stain"}
            </div>
            <div
              className="font-serif text-[1.1rem] font-semibold text-[#000914] leading-[1.3rem] h-[20px] "
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {description || "Intergalactic Lip Oil - Red"}
            </div>
            <div className="flex gap-[.7rem] text-[.88rem] py-[.5rem]">
              <div className=" font-semibold">
                {formatCurrency(price || 10000)}
              </div>
              <div className="line-through decoration-1 text-gray-400">
                {formatCurrency(35)}
              </div>
              <div className="text-red-500">(29% off)</div>
            </div>
            <div className="flex gap-[.7rem] text-[.91rem]">
              <div className="text-gray-500 font-300 border px-[.8rem] rounded-[3rem]">
                10g
              </div>
              <div className="flex items-center text-gray-500 font-300 border px-[.6rem] rounded-[3rem]">
                <GoDotFill size={15} className="text-red-500" /> <div>Rose</div>
              </div>
            </div>
          </Link>

          <div className="mt-[1rem]">
            {" "}
            <CustomButton
              text={"Add to Bag"}
              classNames="hover:bg-primary-deepRed transition-all border border-primary-deepRed w-[100%] text-primary-deepRed hover:text-white px-[1.5rem] py-[.5rem]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
