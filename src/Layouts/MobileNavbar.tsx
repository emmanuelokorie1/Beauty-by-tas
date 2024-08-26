import { BsQuestionCircleFill } from "react-icons/bs";
import { FaBagShopping } from "react-icons/fa6";
import { MdAddIcCall } from "react-icons/md";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { NavLink } from "react-router-dom";

function MobileNavbar() {
  const Data = [
    { name: "Home", icon: <TiHome size={28} />, link: "/" },
    { name: "Shop", icon: <FaBagShopping size={23} />, link: "/shop" },
    {
      name: "Discover",
      icon: <RiCompassDiscoverFill size={28} />,
      link: "/discover",
    },
    {
      name: "About",
      icon: <BsQuestionCircleFill size={23} />,
      link: "/about-us",
    },
    { name: "Contact", icon: <MdAddIcCall size={28} />, link: "/contact-us" },
  ];
  return (
    <div className="fixed md:hidden w-[100%] bottom-0  ">
      <div className="flex justify-between items-center border-t bg-white px-[1rem] py-[1rem]">
        {Data?.map((e, i) => {
          return (
            <NavLink
              key={i}
              className={`link text-gray-500 font-semibold transition duration-500 ease-in-out `}
              to={e?.link}
            >
              <div className="flex justify-center pb-1">{e?.icon}</div>
              <div className="text-[.9rem]">{e?.name}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNavbar;
