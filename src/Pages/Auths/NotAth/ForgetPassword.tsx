import CustomButton from "../../../Components/CustomButton";
import InputLabel from "../../../Components/InputLabel";
import AuthNavText from "../../../Reuseables/AuthNavText";

function ForgetPassword() {
  return (
    <div className="">
      <div className="fontdm sm:text-[1.7rem] text-[1.4rem] text-center"> Let’s get you signed in.</div>

      <div className="py-[1rem] sm:text-[1rem] text-[.9rem] text-gray-700">We will send you an email to reset your password.</div>
      <div>
        <InputLabel type={"email"} label={"Email Address"} />
      </div>

      <div className="pt-[2rem]">
        <CustomButton
          text={"Login"}
          classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-[100%] text-white px-[1.5rem] py-3"
        />
      </div>

      <div>
        <AuthNavText text={""} linkText={"Cancel"} link={"/auth/login"} />
      </div>
    </div>
  );
}

export default ForgetPassword;
