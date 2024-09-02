import { useState } from "react";
import CheckBoxInput from "../../Components/CheckBoxInput";
import InputLabel from "../../Components/InputLabel";
import image from "../../assets/contact/contact.png";
import CustomButton from "../../Components/CustomButton";
import { Link } from "react-router-dom";

function Contact() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <section className="grid md:grid-cols-2 grid-cols-1 containers py-[3rem]">
        <aside className="md:ps-[1rem] s900:ps-[2rem] xl:ps-[4rem]">
          <div className="text-center">
            <div className="fontdm text-[2rem]">Get in touch</div>
            <div className="text-[1rem] text-gray-600">
              Our friendly team would love to hear from you. You can reach us
              anytime via <span className="font-bold">hi@beautybytas.com</span>
            </div>
          </div>

          <div>
            <div className="py-[1.2rem]">
              <InputLabel
                // defaultValue={password}
                // setInputValue={setPassword}
                placeholder={"Full name"}
                type={"text"}
                label={""}
              />
            </div>

            <div>
              <InputLabel
                // defaultValue={password}
                // setInputValue={setPassword}
                placeholder={"Your Email"}
                type={"email"}
                label={""}
              />
            </div>
            <div className="py-[1.2rem]">
              <InputLabel
                // defaultValue={password}
                // setInputValue={setPassword}
                placeholder={"Your Phone Number"}
                type={"tel"}
                label={""}
              />
            </div>

            <div>
              <textarea
                className="w-[100%] border  p-[1rem] rounded-md text-[1rem]"
                name=""
                id=""
                placeholder="Your Message"
                cols={15} // Assigning number type
                rows={7} // Assigning number type
              ></textarea>
            </div>

            <div className="py-[2rem] flex justify-center">
              <CheckBoxInput
                setIsChecked={setIsChecked}
                isChecked={isChecked}
                text={
                  <div>
                    You agree to our friendly{" "}
                    <Link to={"/privacy"} className="underline">
                      privacy policy
                    </Link>
                    .
                  </div>
                }
              />
            </div>

            <div className="py-[1rem]">
              <CustomButton
                text={"Send message"}
                classNames="hover:bg-primary-deepRed bg-[#91566D] text-[.95rem] w-[100%] text-white px-[1.5rem] py-3"
              />
            </div>
          </div>
        </aside>
        <aside className="md:flex justify-center items-center hidden">
          <div className="w-[500px]">
            <img src={image} alt="" className="w-[100%]" />
          </div>
        </aside>
      </section>

      <div className="text-center">
        You can also check our FAQ section
        <Link to={"/faq"} className="underline ps-1">
          here
        </Link>
        .
      </div>
    </>
  );
}

export default Contact;
