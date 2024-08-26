import { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface customProps {
  label?: any;
  type?: any;
  setInputValue?: any;
  setInputValuePassword?: any;
  placeholder?: any;
  defaultValue?: any;
}

const InputLabel: React.FC<customProps> = ({
  label,
  type,
  setInputValue,
  setInputValuePassword,
  placeholder,
  defaultValue
}) => {
  const [toggleEye, setToggleEye] = useState("password");

  const handleToggle = () => {
    if (toggleEye === "password") {
      setToggleEye("text");
    } else {
      setToggleEye("password");
    }
  };
  return (
    <div>
      <div className="my-[.4rem]">
        <label className="sm:text-[.77rem] text-[.7rem] font-semibold text-gray-500 uppercase" htmlFor={label}>
          {label}
        </label>
      </div>
      {type !== "password" ? (
        <div>
          <input
            className="w-[100%] border h-[45px] px-[1rem] rounded-md text-[1rem]"
            type={type || "text"}
            id={label}
            placeholder={placeholder}
            name={label}
            defaultValue={defaultValue}
            onChange={(e) => setInputValue(e?.target?.value)}
          />
        </div>
      ) : (
        <div className="border bg-white flex justify-between items-center px-[1rem] rounded-md">
          <input
            className={`w-[90%] bg-transparent h-[45px] ${
              toggleEye === "password" ? "text-[1.2rem]" : "text-[1rem]"
            } placeholder:text-[1rem] `}
            type={toggleEye}
            id={label}
            placeholder={placeholder}
            name={label}
            onChange={(e) => setInputValuePassword(e?.target?.value)}
          />
          <div onClick={handleToggle} className="cursor-pointer text-gray-700">
            {toggleEye === "password" ? (
              <PiEye size={22} />
            ) : (
              <PiEyeClosed size={23} />
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default InputLabel;
