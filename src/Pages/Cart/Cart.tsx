import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import ProductSwipper from "../../Components/ProductSwipper";
import HeaderText from "../../Components/HeaderText";
import ProductCard from "../../Components/ProductCard";
import {
  LocationDetails,
  ProductType,
  UserDetails,
} from "../../types/commonTypes";
import { useDispatch } from "react-redux";
import { Modal } from "@arco-design/web-react";
import { PostCheckOut } from "../../Redux/Slices/CheckOutSlice";
import InputLabel from "../../Components/InputLabel";
import { AppDispatch } from "../../Redux/Store/store";

function Cart() {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showModalIfNotLoggedIn, setShowModalIfNotLoggedIn] =
    useState<boolean>(false);
  const [getUserDetails, setGetUserDetails] = useState<boolean>(false);

  const userDetails: UserDetails = JSON.parse(
    sessionStorage.getItem("userDetails") || "{}"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedItems: ProductType[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedItems);

    const initialQuantities: { [key: string]: number } = storedItems.reduce(
      (acc, item) => {
        acc[item.productid] = 1; // Set initial quantity to 1
        return acc;
      },
      {}
    );
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    const newTotalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * (quantities[item.productid] || 1),
      0
    );
    setTotalAmount(newTotalAmount);
  }, [cartItems, quantities]);

  const handleIncrementCount = (productid: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productid]: prev[productid] + 1,
    }));
  };

  const handleDecrementCount = (productid: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productid]: prev[productid] > 1 ? prev[productid] - 1 : 1,
    }));
  };

  const handleRemoveFromCart = (productid: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.productid !== productid
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleCheckOut = () => {
    if (userDetails && userDetails.user) {
      const locay: LocationDetails = JSON.parse(
        localStorage.getItem("locay") || "{}"
      );
      if (locay && locay.address) {
        handleSignUp();
      } else {
        setGetUserDetails(true);
      }
    } else {
      setShowModalIfNotLoggedIn(true);
    }
  };

  const data2 = cartItems.map((item) => (
    <ProductCard
      key={item.productid}
      id={item.productid}
      description={item.description}
      productName={item.categoryname}
      price={item.price}
      img={item.images[0]}
    />
  ));

  const handleSignUp = () => {
    setGetUserDetails(false);
    const locay: LocationDetails = JSON.parse(
      localStorage.getItem("locay") || "{}"
    );

    dispatch(
      PostCheckOut({
        endpoint: "/orders/paystack/initialize",
        data: {
          email: userDetails?.user?.email || "",
          name: userDetails?.user?.name || "",
          address: locay?.address || "",
          state: locay?.state || "",
          city: locay?.city || "",
          country: locay?.country || "",
          orders: cartItems.map((item) => ({
            productId: item.productid,
            quantity: quantities[item.productid] || 1,
          })),
        },
      })
    );
  };

  return (
    <div className="containers">
      <div className="text-gray-700 py-[1.5rem]">My Cart</div>

      <Modal
        visible={showModalIfNotLoggedIn}
        onOk={() => navigate("/auth/login")}
        onCancel={() => setShowModalIfNotLoggedIn(false)}
      >
        <div className="pe-[3rem] boldRebuk text-[1.2rem]">
          Insert details to continue
        </div>
      </Modal>

      <section className="s900:flex justify-between gap-[2rem]">
        <aside className="s900:w-[65%] w-[100%] border rounded-md p-[1.6rem] mb-[2rem] s900:mb-0">
          <div className="flex justify-between items-center border-b">
            <div className="fontdm sm:text-[2rem] text-[1.3rem]">My Cart</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.productid} className="flex my-[1rem] border-b">
              <aside className="w-[15%]">
                <div className="h-[100px] overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.description}
                    className="w-[100%] h-full rounded-md object-cover"
                  />
                </div>
              </aside>
              <aside className="ps-[1rem] w-[85%]">
                <div className="text-gray-700 capitalize">
                  {item.categoryname}
                </div>
                <div className="fontdm sm:text-[1.1rem] text-[.97rem]">
                  {item.description}
                </div>
                <div className="font-bold pt-[1rem]">
                  ${item.price * (quantities[item.productid] || 1)}
                </div>

                <div className="flex justify-between items-end py-[1rem]">
                  <div
                    className="text-primary-deepRed cursor-pointer font-bold"
                    onClick={() => handleRemoveFromCart(item.productid)}
                  >
                    Remove
                  </div>
                  <aside className="flex justify-between items-center gap-[10px] rounded-md border border-gray-200 md:w-[35%] w-[50%]">
                    <button
                      className="py-2 w-[35%] hover:bg-gray-200 rounded-md flex justify-center sm:text-[1.3rem] text-[1rem]"
                      onClick={() => handleDecrementCount(item.productid)}
                      disabled={quantities[item.productid] === 1}
                    >
                      <FaMinus />
                    </button>
                    <div className="sm:text-[1.1rem] text-[1rem] font-semibold">
                      {quantities[item.productid]}
                    </div>
                    <button
                      className="py-2 w-[35%] hover:bg-gray-200 flex justify-center rounded-md sm:text-[1.3rem] text-[1rem]"
                      onClick={() => handleIncrementCount(item.productid)}
                    >
                      <FaPlus />
                    </button>
                  </aside>
                </div>
              </aside>
            </div>
          ))}
        </aside>

        <aside className="s900:w-[35%] w-[100%] border rounded-md p-[1.5rem]">
          <div className="fontdm sm:text-[1.7rem] text-[1.2rem] border-b">
            Order Summary
          </div>

          <div className="sm:text-[.95rem] text-[.85rem] pt-[.6rem]">
            <div className="flex justify-between">
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

          <div className="flex justify-between py-[.8rem]">
            <div className="font-bold">Total Amount (USD)</div>
            <div className="font-bold">${totalAmount.toFixed(2)}</div>
          </div>

          <CustomButton
            text="Check Out"
            onClick={handleCheckOut}
            classNames="py-[.6rem] px-[1.3rem] bg-primary-color w-[100%]"
          />
        </aside>
      </section>

      <section className="pt-[5rem]">
        <HeaderText title="Related Products" />
        <ProductSwipper data={data2} />
      </section>
    </div>
  );
}

export default Cart;
