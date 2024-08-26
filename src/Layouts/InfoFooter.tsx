import CustomButton from "../Components/CustomButton";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

function InfoFooter() {
  const help = [
    {
      name: "Quick Help",
      tabs: [
        { name: "Contact Us" },
        { name: "FAQs" },
        { name: "Orders and Shipping" },
        { name: "Returns and Exchanges" },
      ],
    },
  ];
  const About = [
    {
      name: "About Us",
      tabs: [
        { name: "BeautybyTas" },
        { name: "Blog" },
        { name: "Product Finder" },
      ],
    },
  ];

  const Account = [
    {
      name: "Account",
      tabs: [{ name: "My Account" }, { name: "Wishlists" }],
    },
    {
      name: "Discounts",
      tabs: [{ name: "Offers" }, { name: "Refer a friend" }],
    },
  ];

  return (
    <div className="pb-[1rem] pxMedia bg-primary-background flex flex-wrap justify-between items-center w-[100%] ">
      <aside className="s900:w-[50%] w-[100%] pe-[2rem]">
        <div className="border-b-[1px] border-gray-300">
          <div className="w-fit">
            <NavLink to="/" className="w-fit bg-[red]">
              <img src={logo} alt="logo" width={100} />
            </NavLink>
          </div>
        </div>

        <div className="py-[1rem]">
          <div className="text-[1.3rem]" style={{fontFamily: 'displayRegular'}}>
            Join the BeautyByTas Community
          </div>
          <div className="text-[.9rem] text-gray-500 py-[1rem]">
            Sign up with your email address to be the first to hear about
            updates, new products, and more!
          </div>
          <div className="flex items-center sm:gap-[2rem] gap-[1rem]">
            <input
              type="email"
              placeholder="Enter your email address"
              className="outline-none border border-gray-200 bg-white px-3  py-[1rem] rounded-md sm:w-[70%] w-[80%]"
            />
            <div>
              <CustomButton
                text="Submit"
                classNames="bg-white text-primary-textColor md:px-[3rem] sm:px-[1.5rem] px-[1rem] py-[1rem] border"
              />
            </div>
          </div>
          <div className="text-[.8rem] text-gray-500 py-[1rem]">
            By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.
          </div>
        </div>
      </aside>
      <div className="s900:w-[48%] w-[100%] flex justify-between">
        <aside>
          {help?.map((e, i) => {
            return (
              <section key={i}>
                <div className="font-serif  sm:text-[1.1rem] text-[.95rem] font-bold">
                  {e?.name}
                </div>
                <div>
                  {e?.tabs?.map((v, index) => {
                    return (
                      <aside key={index}>
                        <div className="sm:text-[.85rem] text-[.78rem] text-[#555B62] py-2">
                          {v?.name}
                        </div>
                      </aside>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </aside>
        <aside>
          {Account?.map((e, i) => {
            return (
              <section key={i}>
                <div className="font-serif sm:text-[1.1rem] text-[.95rem] font-bold">
                  {e?.name}
                </div>
                <div>
                  {e?.tabs?.map((v, index) => {
                    return (
                      <aside key={index}>
                        <div className="sm:text-[.85rem] text-[.78rem] text-[#555B62] py-2">
                          {v?.name}
                        </div>
                      </aside>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </aside>
        <aside>
          {About?.map((e, i) => {
            return (
              <section key={i}>
                <div className="font-serif  sm:text-[1.1rem] text-[.95rem] font-bold">
                  {e?.name}
                </div>
                <div>
                  {e?.tabs?.map((v, index) => {
                    return (
                      <aside key={index}>
                        <div className="sm:text-[.85rem] text-[.78rem] text-[#555B62] py-2">
                          {v?.name}
                        </div>
                      </aside>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default InfoFooter;
