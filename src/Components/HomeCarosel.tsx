import { Carousel } from "@arco-design/web-react";
import slider1 from "../assets/home/slider1.svg";
import CustomButton from "./CustomButton";

function HomeCarosel() {
  const Data = [
    {
      headerTag: "Pure & Natural Organic Skincare",
      text1:
        "Say hello to Glow-La-La, our NEW skin loving liquid highlighter. Available in 4 shades. Get free shipping with any Glow-La-La purchases*",
      img: slider1,
    },
    {
      headerTag: "Pure & Natural Organic Skincare",
      text1:
        "Say hello to Glow-La-La, our NEW skin loving liquid highlighter. Available in 4 shades. Get free shipping with any Glow-La-La purchases*",
      img: slider1,
    },
    {
      headerTag: "Pure & Natural Organic Skincare",
      text1:
        "Say hello to Glow-La-La, our NEW skin loving liquid highlighter. Available in 4 shades. Get free shipping with any Glow-La-La purchases*",
      img: slider1,
    },
    {
      headerTag: "Pure & Natural Organic Skincare",
      text1:
        "Say hello to Glow-La-La, our NEW skin loving liquid highlighter. Available in 4 shades. Get free shipping with any Glow-La-La purchases*",
      img: slider1,
    },
  ];

  return (
    <div className="bg-[#E6D3D2] h-[75vh] 2xl:h-[30vh] flex items-center">
      <Carousel
        style={{ width: '100%' }}
        autoPlay={true}
        showArrow="hover"
        className="flex items-center "
      >
        {Data.map((e, index) => (
          <div key={index} className="flex items-center h-full">
            <div className="md:py-1 py-[1rem] md:flex justify-between items-center w-full">
              <div className="md:w-[45%] w-full lg:ps-[6rem] s900:ps-[4rem] sm:ps-[2rem] md:pe-0 px-[1rem]">
                <div className="s1100:text-[3rem] xl:text-[3.6rem] s900:text-[2.8rem] md:text-[2.5rem] sm:text-[2rem] text-[1.6rem] font-bold text-primary-textColor font-serif">
                  {e?.headerTag}
                </div>
                <div className="md:py-[1.5rem] py-[1rem] md:text-[1rem] text-[.9rem]">
                  {e?.text1}
                </div>

                <CustomButton
                  text={"SHOP NOW"}
                  classNames="bg-[#752C49] text-white px-[1.5rem] py-3"
                />
              </div>
              <div className="md:w-[55%] w-full flex justify-center">
                <img src={e?.img} className="md:w-[100%] w-[80%]"/>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarosel;
