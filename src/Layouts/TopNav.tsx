// import CustomReact from "../../Reuseables/CustomReact";

function TopNav() {
  return (
    <div className="bg-primary-color flex md:justify-between justify-center items-center py-1">
      <div className="md:w-[35%] hidden md:flex"></div>
      <div className="relative overflow-hidden h-[1.5em] text-[#000914] md:text-[.9rem] text-[.8rem] lg:w-[30%] md:w-[50%] sm:w-[80%] w-[90%] text-center" style={{ lineHeight: '1.5em', height: '1.5em' }}>
        <div className="animate-slide-vertical flex flex-col" style={{ height: '3em' }}>
          <span style={{ height: '1.5em', display: 'block' }}>Free Shipping for orders over NGN200,000</span>
          <span style={{ height: '1.5em', display: 'block' }}>Free sticker pack on orders above NGN100,000</span>
        </div>
      </div>
      <div className="md:flex gap-[2rem] w-[35%] justify-end hidden">
        {/* <div><CustomReact data={languages} title="English" /></div>
        <div><CustomReact data={Currency} title="NGN" /></div> */}
      </div>
    </div>
  );
}

export default TopNav;
