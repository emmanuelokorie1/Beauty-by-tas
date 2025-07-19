import { Carousel } from "@arco-design/web-react";
import CustomButton from "./CustomButton";
import { images } from "../constants";
import { useNavigate } from "react-router-dom";

function HomeCarosel() {
  const Data = [
    {
      headerTag: "Intentionality Meets Beauty and Bodycare",
      text1:
        "Discover luxurious body and lip care essentials designed to give you Juicy Lips & Glowing Skin. Embrace intentional beauty and elevate your self-care routine.",
      img: images?.homeSlider,
    },
    {
      headerTag: "Intentionality Meets Beauty and Bodycare",
      text1:
        "Discover luxurious body and lip care essentials designed to give you Juicy Lips & Glowing Skin. Embrace intentional beauty and elevate your self-care routine.",
      img: images?.homeSlider,
    },
  ];
  
  const navigate = useNavigate();

  const router = () => {
    navigate("/shop");
  }

  return (
    <div
      className="h-[75vh] 2xl:h-[30vh] flex items-center overflow-hidden"
      style={{ background: "linear-gradient(90deg,  #E6D3D2 0%, #FDA551 80%)" }}
    >
      <Carousel
        style={{ width: "100%" }}
        autoPlay={true}
        showArrow="hover"
        className="flex items-center "
      >
        {Data.map((e, index) => (
          <div key={index} className="flex items-center h-full overflow-hidden">
            <div className="md:py-1 py-[1rem] md:flex justify-between items-center w-full">
              <div className="md:w-[45%] w-full lg:ps-[6rem] s900:ps-[4rem] sm:ps-[2rem] md:pe-0 px-[1rem]">
                <div className="s1100:text-[2.8rem] xl:text-[3rem] s900:text-[2.5rem] md:text-[2rem] sm:text-[1.8rem] text-[1.6rem] font-bold text-primary-textColor font-serif">
                  {e?.headerTag}
                </div>
                <div className="md:py-[1.5rem] py-[1rem] md:text-[1rem] text-[.9rem]">
                  {e?.text1}
                </div>

                <CustomButton
                  text={"SHOP NOW"}
                  onClick={router}
                  classNames="bg-[#752C49] text-white px-[1.5rem] py-3"
                />
              </div>
              <div className="md:w-[55%] w-full flex justify-center overflow-hidden">
                <img src={e?.img} className="w-[60%] h-[600px] object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarosel;
