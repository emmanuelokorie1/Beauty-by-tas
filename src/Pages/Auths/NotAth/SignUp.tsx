import CustomButton from "../../../Components/CustomButton";
import InputLabel from "../../../Components/InputLabel";
import AuthNavText from "../../../Reuseables/AuthNavText";
import CheckBoxInput from "../../../Components/CheckBoxInput";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store/store";
import { PostSignUpData } from "../../../Redux/Slices/AuthSlice";

// Typed hooks
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;

function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useAppDispatch();
  const { signUpStatus } = useAppSelector((state) => state.auth);

  const handleSignUp = () => {
    dispatch(
      PostSignUpData({
        endpoint: "/auth/signup",
        data: {
          name: firstName + " " + lastName,
          email: email,
          address: address,
          phonenumber: phoneNumber,
          password: password,
          confirmPassword: confirmPassword,
        },
      })
    );
  };

  return (
    <div className="">
      <div className="fontdm sm:text-[1.7rem] text-[1.4rem] text-center">
        Create an account
      </div>
      <div className="grid grid-cols-2 gap-[1.2rem]">
        <div>
          <InputLabel
            type={"text"}
            label={"First NAME"}
            setInputValue={setFirstName}
          />
        </div>
        <div>
          <InputLabel
            type={"text"}
            label={"LAST NAME"}
            setInputValue={setLastName}
          />
        </div>
      </div>
      <div className="pt-[.5rem]">
        <InputLabel
          type={"email"}
          label={"Email Address"}
          setInputValue={setEmail}
        />
      </div>
      <div className="pt-[.5rem]">
        <InputLabel
          type={"tel"}
          label={"Phone Number"}
          setInputValue={setPhoneNumber}
        />
      </div>
      <div className="pt-[.5rem]">
        <InputLabel
          type={"text"}
          label={"Address"}
          setInputValue={setAddress}
        />
      </div>
      <div className="py-[.5rem]">
        <InputLabel
          type={"password"}
          label={"PASSWORD"}
          setInputValuePassword={setPassword}
        />
      </div>
      <div className="py-[.5rem]">
        <InputLabel
          type={"password"}
          label={"Comfirm PASSWORD"}
          setInputValuePassword={setconfirmPassword}
        />
      </div>

      <CheckBoxInput
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        text={
          "Yes! I want to receive emails about promotions, new products, special events, and exclusive offers."
        }
      />

      <div className="py-[2rem]">
        <CustomButton
          loading={signUpStatus === "loading"}
          onClick={handleSignUp}
          text={"Create an account"}
          classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-[100%] text-white px-[1.5rem] py-3"
        />
      </div>

      <div className="border-t ">
        <AuthNavText
          text={"Already have an account?"}
          linkText={"Login!"}
          link={"/auth/login"}
        />
      </div>
    </div>
  );
}

export default SignUp;
