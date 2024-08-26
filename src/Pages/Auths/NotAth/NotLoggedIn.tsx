import { BsBoxSeam, BsStar } from "react-icons/bs";
import BackgroundImg from "../../../Components/BackgroundImg";
import backImg from "../../../assets/auth/AuthImg.svg";
import { GoGift } from "react-icons/go";
import { ReactNode } from "react";
import { TfiBackLeft } from "react-icons/tfi";
import { Outlet } from "react-router-dom";

interface ShippingItem {
  icon: ReactNode; // ReactNode can represent any valid React element or string
  text: string;
}

const NotLoggedIn = () => {
  const shipping: ShippingItem[] = [
    { icon: <BsBoxSeam />, text: "Free shipping for items over $30" },
    { icon: <BsStar />, text: "Earn points on some of your purchases" },
    { icon: <GoGift />, text: "Access exclusive contents" },
    { icon: <TfiBackLeft />, text: "30 days return policy" },
  ];
  return (
    <div className="pb-[2rem]">
      <BackgroundImg img={backImg} header={"Welcome Back, Friend"} />

      <section className="containers py-[2rem] grid md:grid-cols-2 grid-cols-1 ">
        <aside className="md:border-r">
          <div className=" sm:text-[1rem] text-[.9rem]">YOUR ACCOUNT</div>
          <div className="fontdm py-[1rem] sm:text-[1.6rem] text-[1.4rem]">
            Friends with beauty benefits
          </div>
          <div>
            Pssst… Drop in your details to get exclusive online offers AND first
            dibs on new products and online-only sales.
          </div>

          <div className="pt-[1rem]">
            {shipping?.map((e: ShippingItem, i: number) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-[.8rem] pt-[1rem]"
                >
                  <div className="text-[1.4rem]">{e?.icon}</div>
                  <div>{e?.text}</div>
                </div>
              );
            })}
          </div>
        </aside>
        <aside className="md:ps-[3rem] mt-[3rem] md:mt-0">
          <Outlet />
        </aside>
      </section>
    </div>
  );
};

export default NotLoggedIn;
