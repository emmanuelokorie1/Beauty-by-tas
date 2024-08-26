"use client";
import React from "react";
import { GoHeart } from "react-icons/go";
import productImg from "../assets/product.png";
import { GoDotFill } from "react-icons/go";
import CustomButton from "./CustomButton";

interface customProps {
  classContainer?: String;
  classLoading?: String;
  width?: String;
  img?: any;
  loading?: boolean;
}

const ProductCard: React.FC<customProps> = ({
  classContainer,
  classLoading,
  width,
  img,
  loading,
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
          {/* <Skeleton className="w-[100%] h-[180px] rounded-lg" />
          <Skeleton className="w-[40%] h-[20px] rounded-lg" />
          <Skeleton className="w-[90%] h-[20px] rounded-lg" />
          <Skeleton className="w-[70%] h-[20px] rounded-lg" />
          <Skeleton className="w-[50%] h-[20px] rounded-lg" />
          <Skeleton className="w-[100%] h-[30px] rounded-lg" /> */}
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

          <div className="flex justify-center items-center h-[250px] py-2">
            <img
              src={img || productImg}
              alt="logo"
              // className="w-[100%] "
              // width={120} // Specify the width
              // height={70} // Specify the height
            />
          </div>

          <div className="text-[.85rem] text-[#555B62]">Lip Stain</div>
          <div className="font-serif text-[1.2rem] font-semibold text-[#000914]">
            Intergalactic Lip Oil - Red
          </div>
          <div className="flex gap-[.7rem] text-[.88rem] py-[.5rem]">
            <div className=" font-semibold">$16.00</div>
            <div className="line-through decoration-1 text-gray-400">
              $35.00
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
