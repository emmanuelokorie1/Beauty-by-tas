import { useState } from "react";
import BackgroundImg from "../../../Components/BackgroundImg";
import backImg from "../../../assets/auth/AuthImg.svg";
import UserDetails from "./UserDetails";
import { Link } from "react-router-dom";

interface customProps {}
const Profile: React.FC<customProps> = ({}) => {
  const tabs: string[] = ["Account Details", "My Orders", "My Wishlist"];

  const [tabValue, setTabValue] = useState("Account Details");
  return (
    <div>
      <BackgroundImg
        img={backImg}
        header={tabValue}
        check={true}
        text1={"WELCOME TO YOUR ACCOUNT"}
      />
      
      <div className="containers text-end py-[1.5rem]">
        <Link to={'/auth/login'} className="linkBtn">SIGN OUT</Link>
      </div>

      <section className="containers flex justify-between ">
        <aside className="w-[15%]">
          {tabs?.map((e: string, i: number) => {
            return (
              <div
                onClick={() => setTabValue(e)}
                key={i}
                className={`cursor-pointer mt-[1rem] py-1 text-[.95rem] ps-[1rem] transition-all ${
                  tabValue === e
                    ? "text-primary-deepRed text-[1rem] font-bold border-l-[.4rem] border-primary-deepRed"
                    : " border-transparent ps-[1rem] border-l-[.4rem]"
                } text-gray-700`}
              >
                {e}
              </div>
            );
          })}
        </aside>
        <aside className="w-[85%]">
          <UserDetails />
        </aside>
      </section>
    </div>
  );
};

export default Profile;
