"use client"

import type React from "react"

import { useState } from "react"
import BackgroundImg from "../../../Components/BackgroundImg"
import backImg from "../../../assets/auth/AuthImg.svg"
import UserDetails from "./UserDetails"
import { useAuth } from "../../../hooks/useAuth"

type customProps = {}
const Profile: React.FC<customProps> = ({}) => {
  const tabs: string[] = ["Account Details", "My Orders", "My Wishlist"]
  const [tabValue, setTabValue] = useState("Account Details")
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <BackgroundImg img={backImg} header={tabValue} check={true} text1={"WELCOME TO YOUR ACCOUNT"} />

      <div className="containers text-end py-[1.5rem]">
        <button onClick={handleLogout} className="linkBtn">
          SIGN OUT
        </button>
      </div>

      <section className="containers md:flex justify-between ">
        <aside className="s1100:w-[15%] md:w-[25%] w-[100%] flex  md:block gap-[2rem] md:gap-0 mb-[1rem]">
          {tabs?.map((e: string, i: number) => {
            return (
              <div
                onClick={() => setTabValue(e)}
                key={i}
                className={`cursor-pointer mt-[1rem] py-1 text-[.95rem] md:ps-[1rem] transition-all ${
                  tabValue === e
                    ? "text-primary-deepRed text-[1rem] font-bold md:border-l-[.4rem] md:border-b-0 border-b-[.2rem] border-primary-deepRed"
                    : " border-transparent md:ps-[1rem] md:border-l-[.4rem]"
                } text-gray-700`}
              >
                {e}
              </div>
            )
          })}
        </aside>
        <aside className="s1100:w-[85%] md:w-[75%] w-[100%]">
          <UserDetails />
        </aside>
      </section>
    </div>
  )
}

export default Profile
