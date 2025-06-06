"use client"

import { Link } from "react-router-dom"
import CustomButton from "../../../Components/CustomButton"
import InputLabel from "../../../Components/InputLabel"
import AuthNavText from "../../../Reuseables/AuthNavText"
import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, isLoginLoading } = useAuth()

  const handleLogin = () => {
    login({
      email: email,
      password: password,
    })
  }

  return (
    <div className="">
      <div className="fontdm sm:text-[1.7rem] text-[1.4rem] text-center">Let's get you signed in.</div>
      <div>
        <InputLabel type={"email"} label={"Email Address"} setInputValue={setEmail} />
      </div>
      <div className="py-[.5rem]">
        <InputLabel type={"password"} label={"PASSWORD"} setInputValuePassword={setPassword} />
      </div>

      <div className="py-[1rem]">
        <CustomButton
          loading={isLoginLoading}
          text={"Login"}
          onClick={handleLogin}
          classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-[100%] text-white px-[1.5rem] py-3"
        />
      </div>

      <div className="border-b border-gray-300 pb-[1.5rem]">
        <Link to={"/auth/forget-password"} className="underline">
          Forgot your password?
        </Link>
      </div>

      <div>
        <AuthNavText text={"Don't have an account?"} linkText={"Sign Up!"} link={"/auth/sign-up"} />
      </div>
    </div>
  )
}

export default Login
