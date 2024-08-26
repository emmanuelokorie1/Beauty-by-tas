import CustomButton from "../../../Components/CustomButton";
import InputLabel from "../../../Components/InputLabel";
import AuthNavText from "../../../Reuseables/AuthNavText";
import CheckBoxInput from "../../../Components/CheckBoxInput";
import { useState } from "react";

function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="">
      <div className="fontdm sm:text-[1.7rem] text-[1.4rem] text-center">Create an account</div>
      <div className="grid grid-cols-2 gap-[1.2rem]">
        <div>
          <InputLabel type={"text"} label={"First NAME"} />
        </div>
        <div>
          <InputLabel type={"text"} label={"LAST NAME"} />
        </div>
      </div>
      <div className="pt-[.5rem]">
        <InputLabel type={"email"} label={"Email Address"} />
      </div>
      <div className="py-[.5rem]">
        <InputLabel type={"password"} label={"PASSWORD"} />
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
          text={"Create an account"}
          classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-[100%] text-white px-[1.5rem] py-3"
        />
      </div>

      <div className="border-t ">
        <AuthNavText
          text={"Already have an account?"}
          linkText={"Sign In!"}
          link={"/auth/login"}
        />
      </div>
    </div>
  );
}

export default SignUp;
