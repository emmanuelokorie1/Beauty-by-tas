import { FaMinus, FaPlus, FaRegCircleUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import productImg from "../../assets/ProductDescription/des1.svg";
import { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import ProductSwipper from "../../Components/ProductSwipper";
import HeaderText from "../../Components/HeaderText";
import ProductCard from "../../Components/ProductCard";
import { ProductType } from "../../types/commonTypes";
import { AppDispatch, RootState } from "../../Redux/Store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCount,
  incrementCount,
  removeFromCart,
} from "../../Redux/Slices/CartSlice";
import { Modal } from "@arco-design/web-react";
import { toast } from "sonner";
import { PostCheckOut } from "../../Redux/Slices/CheckOutSlice";
import InputLabel from "../../Components/InputLabel";

function Cart() {
  // Typed hooks
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: <TSelected>(
    selector: (state: RootState) => TSelected
  ) => TSelected = useSelector;

  const [productCount, setProductCount] = useState(1);
  const dispatch = useAppDispatch();

  // const incrementCount = () => setProductCount((prev) => prev + 1);
  // const decrementCount = () =>
  //   setProductCount((prev) => (prev > 1 ? prev - 1 : prev));

  const { checkOutStatus } = useAppSelector((state) => state.checkout);

  const CardData = [
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
  ];

  const [cartItems, setCartItems] = useState<ProductType[]>([]); // Store cart items in state

  // Fetch cart items from localStorage when component mounts
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedItems); // Set the retrieved items to state
  }, []);

  const totalAmount =
    cartItems?.reduce((acc, e) => acc + e?.price * productCount, 0) || 0;

  const handleIncrementCount = (productid) => {
    dispatch(incrementCount(productid));
  };

  const handleDecrementCount = (productid) => {
    dispatch(decrementCount(productid));
  };

  const handleRemoveFromCart = (productid) => {
    dispatch(removeFromCart(productid));
  };

  const [showModalIfNotLoggedIn, setShowModalIfNotLoggedIn] = useState(false);

  const [getUserDetails, setGetUserDetails] = useState(false);

  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  const cartItemsStorage = JSON.parse(localStorage.getItem("cartItems"));

  const locay = JSON.parse(localStorage.getItem("locay"));

  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (userDetails) {
      // toast.success("success");

      if (locay) {
        handleSignUp();
      } else {
        setGetUserDetails(true);
      }
    } else {
      setShowModalIfNotLoggedIn(true);
    }
  };

  const [getLocationDetailsInputs, setGetLocationDetailsInputs] = useState({
    address: "",
    state: "",
    city: "",
    country: "",
  });

  function handleSignUp() {
    setGetUserDetails(false);

    if (!locay) {
      localStorage.setItem("locay", JSON.stringify(getLocationDetailsInputs));
    }

    dispatch(
      PostCheckOut({
        endpoint: "/orders/paystack/initialize",
        data: {
          email: userDetails?.user?.email,
          name: userDetails?.user?.name,
          address: getLocationDetailsInputs?.address || locay?.address,
          state: getLocationDetailsInputs?.state || locay?.state,
          city: getLocationDetailsInputs?.city || locay?.city,
          country: getLocationDetailsInputs?.country || locay?.country,
          orders: cartItemsStorage?.map((e) => {
            return { productId: e?.productid, quantity: 1 };
          }),
        },
      })
    );
  }

  const handleInputChange = (field) => (value) => {
    setGetLocationDetailsInputs((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  return (
    <div className="containers">
      <div className="text-gray-700 py-[1.5rem]">My Cart</div>

      <Modal
        // title="Modal Title"
        visible={showModalIfNotLoggedIn}
        onOk={() => navigate("/auth/login")}
        onCancel={() => setShowModalIfNotLoggedIn(false)}
        autoFocus={false}
        focusLock={true}
      >
        <div className="pe-[3rem] boldRebuk text-[1.2rem]">
          Insert details to continue
        </div>
      </Modal>

      <Modal
        title="Delivery Location"
        visible={getUserDetails}
        onOk={handleSignUp}
        onCancel={() => setGetUserDetails(false)}
        autoFocus={false}
        focusLock={true}
      >
        <div>
          <InputLabel
            type={"text"}
            label={"Address"}
            // setInputValue={setEmail}
            setInputValue={handleInputChange("address")}
          />
        </div>

        <div>
          <InputLabel
            type={"text"}
            label={"State"}
            // setInputValue={setEmail}
            setInputValue={handleInputChange("state")}
          />
        </div>
        <div>
          <InputLabel
            type={"text"}
            label={"City"}
            // setInputValue={setEmail}
            setInputValue={handleInputChange("city")}
          />
        </div>

        <div>
          <InputLabel
            type={"text"}
            label={"Country"}
            // setInputValue={setEmail}
            setInputValue={handleInputChange("country")}
          />
        </div>
      </Modal>

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

          {!userDetails && (
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
          )}

          <div>
            {cartItems?.map((e, i) => {
              return (
                <div key={i} className="flex my-[1rem] border-b">
                  <aside className="w-[15%]">
                    <div className="h-[100px] overflow-hidden">
                      <img
                        src={e?.images[0]}
                        alt=""
                        className="w-[100%] h-full rounded-md object-cover" // Use object-cover to maintain aspect ratio
                      />
                    </div>
                  </aside>
                  <aside className="ps-[1rem] w-[85%]">
                    <div className="text-gray-700 capitalize">
                      {e?.categoryname}
                    </div>
                    <div className="fontdm sm:text-[1.1rem] text-[.97rem]">
                      {e?.description}
                    </div>
                    <div className="font-bold pt-[1rem]">
                      ${e?.price * productCount}
                    </div>

                    <div className="flex justify-between items-end  py-[1rem]">
                      <div
                        className="text-primary-deepRed cursor-pointer font-bold"
                        onClick={() => handleRemoveFromCart(e?.productid)}
                      >
                        Remove
                      </div>
                      <aside className="flex justify-between items-center gap-[10px] rounded-md border border-gray-200 md:w-[35%] w-[50%]">
                        <button
                          className={`py-2 w-[35%] hover:bg-gray-200 rounded-md flex justify-center sm:text-[1.3rem] text-[1rem] ${
                            productCount === 1 &&
                            "cursor-not-allowed text-gray-400"
                          }`}
                          onClick={() => handleDecrementCount(e?.productid)}
                          disabled={productCount === 1}
                        >
                          <FaMinus />
                        </button>
                        <div className="sm:text-[1.1rem] text-[1rem] font-semibold">
                          {productCount}
                        </div>
                        <button
                          className="py-2 w-[35%] hover:bg-gray-200 flex justify-center rounded-md sm:text-[1.3rem] text-[1rem]"
                          onClick={() => handleIncrementCount(e?.productid)}
                        >
                          <FaPlus />
                        </button>
                      </aside>
                    </div>
                  </aside>
                </div>
              );
            })}
          </div>
        </aside>
        <aside className="s900:w-[35%] w-[100%] border rounded-md p-[1.5rem]">
          <div className="fontdm sm:text-[1.7rem] text-[1.2rem] border-b">
            Order Summary
          </div>

          <div className=" sm:text-[.95rem] text-[.85rem] pt-[.6rem]">
            <div className="flex justify-between ">
              <div className="text-gray-700">Subtotal (USD)</div>
              <div className="font-bold">${totalAmount.toFixed(2)}</div>
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
            <div className="font-bold">${totalAmount.toFixed(2)}</div>
          </div>

          <CustomButton
            loading={checkOutStatus === "loading"}
            onClick={handleCheckOut}
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
