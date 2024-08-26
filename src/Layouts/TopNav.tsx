// import CustomReact from "../../Reuseables/CustomReact";

function TopNav() {
  // const languages = [
  //   { value: "english", label: "English" },
  //   { value: "british", label: "British" },
  // ];
  // const Currency = [
  //   { value: "Naira", label: "NGN" },
  //   { value: "dollar", label: "USD" },
  // ];
  return (
    <div className="bg-primary-color flex md:justify-between justify-center items-center py-1">
      <div className="md:w-[35%] hidden md:flex"></div>
      <div className="text-[#000914] md:text-[.9rem] text-[.8rem] lg:w-[30%] md:w-[50%] sm:w-[80%] w-[90%] text-center"> 
        FREE SHIPPING FOR ORDERS OVER NGN 50,000
      </div>
      <div className="md:flex gap-[2rem] w-[35%] justify-end hidden">
        {/* <div><CustomReact data={languages} title="English" /></div>
        <div><CustomReact data={Currency} title="NGN" /></div> */}
      </div>
    </div>
  );
}

export default TopNav;
