import { useState } from "react";
import InputLabel from "../../../Components/InputLabel";
import CustomButton from "../../../Components/CustomButton";
import { PiInfo } from "react-icons/pi";

type EditState = {
  personal: boolean;
  address: boolean;
  account: boolean;
  password: boolean;
};

const UserDetails = () => {
  const [firstName, setFirstName] = useState("Pixel");
  const [lastName, setLastName] = useState("Signature");
  const [dob, setDob] = useState("Not yet added");
  const [email, setEmail] = useState("pixelssignature1@gmail.com");
  const [password, setPassword] = useState("...........");

  const [address, setAddress] = useState("4317 Godfrey Road, New York");

  const [edit, setEdit] = useState<EditState>({
    personal: false,
    address: false,
    account: false,
    password: false,
  });

  const handleEditClick = (field: keyof EditState) => {
    setEdit((prevEdit) => ({
      ...prevEdit,
      [field]: !prevEdit[field],
    }));
  };

  return (
    <div className="flex justify-between gap-[1.5rem]">
      <section className="w-[65%] ">
        <aside className="bg-[#F3F3F3] p-[2rem] rounded-lg">
          <div className="flex justify-between pb-[2rem]">
            <div className=" text-[1.2rem] fontdm">Personal information</div>
            <div
              className="linkBtn"
              onClick={() => handleEditClick("personal")}
            >
              {edit?.personal ? "Cancel" : "Edit"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[2rem]">
            <div>
              {edit?.personal ? (
                <>
                  <InputLabel
                    defaultValue={firstName}
                    setInputValue={setFirstName}
                    type={"text"}
                    label={"First Name"}
                  />
                  <div className="pt-[.7rem]">
                    <InputLabel
                      defaultValue={lastName}
                      setInputValue={setLastName}
                      type={"text"}
                      label={"Last Name"}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="sm:text-[.77rem] text-[.7rem] font-semibold text-black uppercase">
                    Name
                  </label>
                  <div className="pt-[.5rem] text-[.88rem] text-gray-700">
                    {firstName + " " + lastName}
                  </div>
                </div>
              )}
            </div>

            <div>
              {edit?.personal ? (
                <InputLabel
                  defaultValue={dob}
                  setInputValue={setDob}
                  type={"date"}
                  label={"Birthday"}
                />
              ) : (
                <div>
                  <label className="sm:text-[.77rem] text-[.7rem] font-semibold text-black uppercase">
                    Birthday
                  </label>
                  <div className="pt-[.5rem] text-[.88rem] text-gray-700">
                    {dob}
                  </div>
                </div>
              )}
            </div>
          </div>
          {edit?.personal && (
            <div className="flex justify-end mt-[2rem]">
              <CustomButton
                text={"Save Changes"}
                classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-fit text-white px-[2rem] py-3"
              />
            </div>
          )}
        </aside>
        <aside className="bg-[#F3F3F3] p-[2rem] rounded-lg mt-[1.5rem]">
          <div className="flex justify-between pb-[2rem]">
            <div className=" text-[1.2rem] fontdm">Account</div>
            <div className="linkBtn" onClick={() => handleEditClick("account")}>
              {edit?.account ? "Cancel" : "Edit"}
            </div>
          </div>

          <div className="">
            <div className="border-b pb-[1rem]">
              {edit?.account ? (
                <div className="w-[60%]">
                  <InputLabel
                    defaultValue={email}
                    setInputValue={setEmail}
                    type={"email"}
                    label={"Email account"}
                  />
                </div>
              ) : (
                <div>
                  <label className="sm:text-[.77rem] text-[.7rem] font-semibold text-black uppercase">
                    Email account
                  </label>
                  <div className="pt-[.5rem] text-[.88rem] text-gray-700">
                    {email}
                  </div>
                </div>
              )}

              {edit?.account && (
                <div className="flex mt-[2rem]">
                  <CustomButton
                    text={"Save Changes"}
                    classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-fit text-white px-[2rem] py-3"
                  />
                </div>
              )}
            </div>
            <div className="pt-[1rem]">
              <div className="flex justify-between pb-[2rem]">
                <div className=" text-[1.2rem] fontdm">Password</div>
                <div
                  className="linkBtn"
                  onClick={() => handleEditClick("password")}
                >
                  {edit?.password ? "Cancel" : "Edit"}
                </div>
              </div>
              {edit?.password ? (
                <div className="w-[60%]">
                  <InputLabel
                    defaultValue={password}
                    setInputValue={setPassword}
                    type={"password"}
                    label={"current password"}
                  />
                  <div>
                    <InputLabel
                      defaultValue={password}
                      setInputValue={setPassword}
                      type={"password"}
                      label={"new password"}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="sm:text-[.77rem] text-[.7rem] font-semibold text-black uppercase">
                    Password
                  </label>
                  <div className=" text-[2rem] text-gray-700">{password}</div>
                </div>
              )}

              {edit?.password && (
                <div className="flex items-center gap-[.5rem] mt-[2rem]">
                  <CustomButton
                    text={"Save Changes"}
                    classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-fit text-white px-[2rem] py-3"
                  />
                  <div className="text-[.8rem] flex items-center gap-[.3rem] text-red-600">
                    <PiInfo size={20} /> Please note: Changing your password will require
                    you to log in again.
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="w-[35%]">
        <aside className="bg-[#F3F3F3] px-[1rem] py-[2rem] rounded-lg">
          <div className="flex justify-between pb-[2rem]">
            <div className=" text-[1.2rem] fontdm">Address Information</div>
            <div className="linkBtn" onClick={() => handleEditClick("address")}>
              {edit?.address ? "Cancel" : "Edit"}
            </div>
          </div>

          <div className="">
            <div>
              {edit?.address ? (
                <>
                  <InputLabel
                    defaultValue={address}
                    setInputValue={setAddress}
                    type={"text"}
                    label={"Default"}
                  />
                </>
              ) : (
                <div>
                  <label className="sm:text-[.77rem] text-[.7rem] font-semibold text-black uppercase">
                    Default
                  </label>
                  <div className="pt-[.5rem] text-[.88rem] text-gray-700">
                    {address}
                  </div>
                </div>
              )}
            </div>
          </div>
          {edit?.address && (
            <div className="flex justify-end mt-[2rem]">
              <CustomButton
                text={"Save Changes"}
                classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-fit text-white px-[2rem] py-3"
              />
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};

export default UserDetails;