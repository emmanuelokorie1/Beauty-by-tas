import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import TopNav from "./TopNav";
import MobileNavbar from "./MobileNavbar";
import InfoFooter from "./InfoFooter";
import Footerr from "./Footerr";

function Layouts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="containerMain">
      <TopNav />
      <Navbar />
      <div data-aos="fade-down w-[100%] overflow-hidden ">
        <Outlet />
      </div>
      <InfoFooter />
      <Footerr />
      <MobileNavbar />
    </div>
  );
}

export default Layouts;
