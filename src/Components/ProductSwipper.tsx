import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

interface customProps {
  data?: any;
}

const ProductSwipper: React.FC<customProps> = ({ data }) => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      freeMode={true}
      loop={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {data?.map((e: String, i: number) => (
        <SwiperSlide key={i}>{e}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwipper;
