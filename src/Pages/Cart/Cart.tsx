import { FaMinus, FaPlus, FaRegCircleUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import productImg from "../../assets/ProductDescription/des1.svg";
import { useState } from "react";
import CustomButton from "../../Components/CustomButton";
import ProductSwipper from "../../Components/ProductSwipper";
import HeaderText from "../../Components/HeaderText";
import ProductCard from "../../Components/ProductCard";

function Cart() {
  const [productCount, setProductCount] = useState(1);

  const incrementCount = () => setProductCount((prev) => prev + 1);
  const decrementCount = () =>
    setProductCount((prev) => (prev > 1 ? prev - 1 : prev));

  const amount = 16.13;

  const CardData = [
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
  ];

  return (
    <div className="containers">
      <div className="text-gray-700 py-[1.5rem]">My Cart</div>

      <section className=" s900:flex justify-between gap-[2rem]">
        <aside className="s900:w-[65%] w-[100%] border rounded-md p-[1.6rem] mb-[2rem] s900:mb-0">
          <div className="flex justify-between items-center border-b">
            <div className="fontdm sm:text-[2rem] text-[1.3rem]">My Cart</div>
            <div className="flex  items-center gap-2 cursor-pointer">
              Continue Shopping{" "}
              <div>
                <IoIosArrowForward />
              </div>
            </div>
          </div>

          <div className="sm:flex items-center gap-2 text-gray-700 bg-gray-100 py-[1rem] my-[1rem] px-[1rem] rounded-md text-[.95rem]">
            <div className="flex items-center gap-2">
              <div>
                <FaRegCircleUser />
              </div>
              <Link className="underline" to={"/login"}>
                Login
              </Link>
              <div>or</div>
            </div>
            <div className="flex items-center gap-2">
              <Link className="underline" to={"/signup"}>
                Sign Up
              </Link>
              <div>to enjoy discounts</div>
            </div>
          </div>

          <div className="flex ">
            <aside className="w-[15%]">
              <img src={productImg} alt="" />
            </aside>
            <aside className="ps-[1rem] w-[85%]">
              <div className="text-gray-700">Body Care</div>
              <div className="fontdm sm:text-[1.1rem] text-[.97rem]">
                Plum Bodylovin Vanilla Vibes Body Butter - (25g)
              </div>
              <div className="font-bold pt-[1rem]">
                ${amount * productCount}
              </div>

              <div className="flex justify-between items-end  py-[1rem]">
                <div className="text-primary-deepRed cursor-pointer font-bold">
                  Remove
                </div>
                <aside className="flex justify-between items-center gap-[10px] rounded-md border border-gray-200 md:w-[35%] w-[50%]">
                  <button
                    className={`py-2 w-[35%] hover:bg-gray-200 rounded-md flex justify-center sm:text-[1.3rem] text-[1rem] ${
                      productCount === 1 && "cursor-not-allowed text-gray-400"
                    }`}
                    onClick={decrementCount}
                    disabled={productCount === 1}
                  >
                    <FaMinus />
                  </button>
                  <div className="sm:text-[1.1rem] text-[1rem] font-semibold">
                    {productCount}
                  </div>
                  <button
                    className="py-2 w-[35%] hover:bg-gray-200 flex justify-center rounded-md sm:text-[1.3rem] text-[1rem]"
                    onClick={incrementCount}
                  >
                    <FaPlus />
                  </button>
                </aside>
              </div>
            </aside>
          </div>
        </aside>
        <aside className="s900:w-[35%] w-[100%] border rounded-md p-[1.5rem]">
          <div className="fontdm sm:text-[1.7rem] text-[1.2rem] border-b">
            Order Summary
          </div>

          <div className=" sm:text-[.95rem] text-[.85rem] pt-[.6rem]">
            <div className="flex justify-between ">
              <div className="text-gray-700">Subtotal (USD)</div>
              <div className="font-bold">${amount * productCount}</div>
            </div>
            <div className="flex justify-between py-[.6rem]">
              <div className="text-gray-700">Shipping Fees</div>
              <div className="font-bold">Calculated at checkout</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-700">Tax Fees</div>
              <div className="font-bold">Calculated at checkout</div>
            </div>
          </div>

          <div className="flex justify-between py-[.6rem] my-[2rem] border-t border-b">
            <div className="text-gray-700">Estimated Total</div>
            <div className="font-bold">${amount * productCount}</div>
          </div>

          <CustomButton
            text="Continue to Checkout"
            classNames="bg-[#752C49] w-[100%] text-white px-[1.5rem] py-3"
          />
        </aside>
      </section>

      <section className=" py-[2rem]">
        <HeaderText text="Similar Products" />
        <ProductSwipper data={CardData} />
      </section>
    </div>
  );
}

export default Cart;
