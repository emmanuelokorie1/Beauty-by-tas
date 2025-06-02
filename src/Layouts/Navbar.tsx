"use client"

import logo from "../assets/logo.svg"
import { PiUserCircle } from "react-icons/pi"
import { GoHeart } from "react-icons/go"
import { NavLink } from "react-router-dom"
import { LuSearch } from "react-icons/lu"
import { IoBagHandleOutline } from "react-icons/io5"
import { Badge } from "@arco-design/web-react"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"

function Navbar() {
  const routes = [
    { name: "SHOP", link: "/shop" },
    { name: "DISCOVER", link: "/discover" },
    { name: "ABOUT US", link: "/about-us" },
    { name: "CONTACT US", link: "/contact-us" },
  ]

  const { user } = useAuth()
  const { cartItems } = useCart()

  return (
    <section className="flex justify-between w-full py-3 md:py-0 md:bg-primary-background bg-white z-[999] md:px-[2rem] px-[1rem] sticky top-0 border-b-[1px] border-gray-200">
      <aside className="md:flex items-center s1100:gap-[2rem] s900:gap-[1rem] hidden s1100:w-[48%] w-[54%]">
        <NavLink to={"/"} className="">
          <img src={logo || "/placeholder.svg"} alt="" className="s900:w-[120px] w-[100px]" />
        </NavLink>
        <div className="flex items-center lg:gap-[2rem] s900:gap-[1rem] gap-[.8rem]">
          {routes?.map((e, i) => (
            <NavLink
              key={i}
              className="link text-gray-500 lg:text-[.9rem] s900:text-[.85rem] text-[.8rem] font-semibold transition duration-500 ease-in-out"
              to={e?.link}
            >
              {e?.name}
            </NavLink>
          ))}
        </div>
      </aside>

      <aside className="flex items-center s1100:w-[48%] md:w-[45%] w-[100%]">
        <div className="relative flex items-center px-3 border-[.11rem] border-primary-textColor rounded-md overflow-hidden shadow-sm w-full md:w-[65%]">
          <div className="text-gray-600 text-[1.3rem]">
            <LuSearch />
          </div>
          <input
            type="search"
            placeholder="Can we help you find something?"
            className="w-full px-3 py-3 outline-none bg-transparent border-none text-gray-700 sm:placeholder:text-[.9rem] placeholder:text-[.8rem]"
          />
        </div>

        <div className="flex xl:gap-[2rem] md:gap-[1rem] justify-between md:justify-start  items-center sm:border-l-[1px] border-primary-textColor s450:ps-[1rem] ms-[.5rem] md:w-[35%] w-[40%]">
          <NavLink to={`${user ? "profile" : "/auth/login"}`} className="cursor-pointer text-gray-700  text-[1.8rem]">
            <PiUserCircle />
          </NavLink>
          <div className="cursor-pointer text-gray-700 text-[1.8rem]">
            <GoHeart />
          </div>
          <NavLink to={"/cart"} className="cursor-pointer text-gray-700  text-[1.8rem]">
            <Badge count={cartItems.length}>
              <IoBagHandleOutline />
            </Badge>
          </NavLink>
        </div>
      </aside>
    </section>
  )
}

export default Navbar
