"use client";

import { NavLink } from "react-router-dom";
import HeaderText from "../../Components/HeaderText";
import HeaderTextCenter from "../../Components/HeaderTextCenter";
import HomeCarosel from "../../Components/HomeCarosel";
import ProductCard from "../../Components/ProductCard";
import ProductSwipper from "../../Components/ProductSwipper";

import bestSeller1 from "../../assets/home/bestSelling1.svg";
import bestSeller2 from "../../assets/home/bestSelling2.svg";
import bestSeller3 from "../../assets/home/bestSelling3.svg";

import skinCare from "../../assets/home/skinCare.svg";
import bodyCare from "../../assets/home/bodyCare.svg";
import giftSet from "../../assets/home/giftSet.svg";
import addOns from "../../assets/home/addOns.svg";

import Look from "../../assets/home/look.svg";
import Look1 from "../../assets/home/look1.svg";
import Look2 from "../../assets/home/look2.svg";

import community1 from "../../assets/home/community1.svg";
import community2 from "../../assets/home/community2.svg";
import community3 from "../../assets/home/community3.svg";
import community4 from "../../assets/home/community4.svg";

import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import {
  useCategories,
  useBestSeller,
  useAlmostSoldOut,
  useNewProduct,
} from "../../hooks/useCategories";
import Loading from "../../Components/Loading";
import CategoryCard from "../../Components/CategoryCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const bestSeller = [bestSeller1, bestSeller2, bestSeller3];

  const ExploreData = [
    { img: skinCare, tab: "Body Care" },
    { img: bodyCare, tab: "Lips Care" },
    { img: giftSet, tab: "Gift Sets" },
    { img: addOns, tab: "Add-Ons" },
  ];

  const CommunityData = [
    { img: community1, tab: "Simple layering with @tomi_das" },
    {
      img: community2,
      tab: "Step into the new month with your lips looking plump and ready to take on the world with just a dash of CHOCOLATTE!",
    },
    {
      img: community3,
      tab: "True friendship is sharing your lip gloss with your friend",
    },
    { img: community4, tab: "Hello from a stunning #beautybytas queen💗🌟" },
  ];

  const getUniqueIdentifier = async () => {
    // Fetch the IP address using an external API
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const ipAddress = data.ip; // Get the IP address from the API response
      return `${ipAddress}`;
    } catch (error) {
      console.error("Failed to get IP address:", error);
      return "unknown";
    }
  };

  // Using TanStack Query to fetch categories
  const { data: bestSellerData, isLoading: bestSellerLoader } = useBestSeller();
  const { data: newProductData, isLoading: newProductLoader } = useNewProduct();
  const { data: almostSoldOutData, isLoading: almostSoldOutLoader } =
    useAlmostSoldOut();

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  console.log(categories);

  const CardData = Array?.isArray(bestSellerData?.data)
    ? bestSellerData?.data?.map((item: any, index: number) => {
        return (
          <ProductCard
            key={index}
            width="100%"
            img={item?.images && item?.images[0]}
            loading={bestSellerLoader}
            description={item?.description}
            productName={item?.productName}
            price={item?.price}
            id={item?.categoryId}
          />
        );
      })
    : [];

  const almostSoldOutCardData = Array?.isArray(almostSoldOutData?.data)
    ? almostSoldOutData?.data?.map((item: any, index: number) => {
        return (
          <ProductCard
            key={index}
            width="100%"
            img={item?.images && item?.images[0]}
            // loading={almostSoldOutLoader}
            description={item?.description}
            productName={item?.productName}
            price={item?.price}
            id={item?.categoryId}
            stockStatus={item?.stockStatus}
            totalStock={item?.totalStock}
          />
        );
      })
    : [];

  const newProductCardData = Array?.isArray(newProductData?.data)
    ? newProductData?.data?.map((item: any, index: number) => {
        return (
          <ProductCard
            key={index}
            width="100%"
            img={item?.images && item?.images[0]}
            loading={newProductLoader}
            description={item?.description}
            productName={item?.productName}
            price={item?.price}
            id={item?.categoryId}
          />
        );
      })
    : [];

  const navigate = useNavigate();

  useEffect(() => {
    getUniqueIdentifier();
  }, []);

  return (
    <div>
      <HomeCarosel />
      <div className="containers ">
        <div className=" flex justify-center py-[2rem]">
          <div className="text-[#000914] md:w-[60%] sm:w-[80%] w-[100%] sm:text-[18px] text-[1rem] font-serif font-bold  text-center">
            Modern, utilitarian, multifunctional skincare and cosmetic
            essentials, designed to work seamlessly into your daily beauty
            ritual.
          </div>
        </div>

        <div>
          <HeaderText title="Shop our Bestsellers" />
          {bestSellerLoader ? (
            <div className="flex justify-center items-center py-8">
              <Loading />
            </div>
          ) : CardData.length === 0 ? (
            <div className="flex justify-center items-center py-8 text-gray-500">
              No best sellers available at the moment.
            </div>
          ) : (
            <ProductSwipper data={CardData} />
          )}
        </div>

        <div className="mt-4">
          <HeaderText title="Our New Products" />
          {newProductLoader ? (
            <div className="flex justify-center items-center py-8">
              <Loading />
            </div>
          ) : newProductCardData.length === 0 ? (
            <div className="flex justify-center items-center py-8 text-gray-500">
              No New Product available at the moment.
            </div>
          ) : (
            <ProductSwipper data={newProductCardData} />
          )}
        </div>

        <div className=" pt-[2rem]">
          <HeaderText title="Our Best-Selling Sets" />

          <div className="flex justify-between flex-nowrap items-center md:gap-4 gap-2 mt-[1rem] overflow-x-scroll custom-scrollbar  mb-[2rem]">
            {bestSeller?.map((e, index) => {
              return (
                <div
                  key={index}
                  className="flex-none w-[70%] md:w-[40%] lg:w-[32%] p-2"
                  style={{ height: "500px" }}
                >
                  <img
                    src={e || "/placeholder.svg"}
                    alt="Best Seller"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-primary-deepRed text-white grid md:grid-cols-2 grid-cols-1 py-[2rem] xl:px-[10rem] sm:px-[5rem] px-[2rem] ">
        <aside className="text-center md:text-start mb-[1.2rem]">
          <div className="font-bold">BEAUTY BY TAS</div>{" "}
          <div className="font-bold text-[1.8rem] fontdm">
            Intentionality meets body + lip care.
          </div>
        </aside>
        <aside>
          <div className="text-[.9rem] ">
            We believe that feeling glamorous shouldn't cost a fortune. Our
            customers rely on us to help them feel beautiful without breaking
            the bank.
          </div>
          <div className="text-[.9rem]" style={{ padding: "1rem 0" }}>
            From makeup to accessories, we offer a wide range of top-notch
            products at amazing prices. Come join us in celebrating beauty,
            diversity, and empowerment.
          </div>
          <NavLink
            to="/about-us"
            className=" flex items-center gap-[10px] hover:underline decoration-1 cursor-pointer text-[.9rem] "
          >
            <div>LEARN MORE ABOUT BEAUTY BY TAS</div>{" "}
            <div>
              <IoIosArrowForward />
            </div>
          </NavLink>
        </aside>
      </section>

      <div className="mt-4 containers ">
        <HeaderText title="Almost Sold Out Product" />
        {almostSoldOutLoader ? (
          <div className="flex justify-center items-center py-8">
            <Loading />
          </div>
        ) : almostSoldOutCardData.length === 0 ? (
          <div className="flex justify-center items-center py-8 text-gray-500">
            No best sellers available at the moment.
          </div>
        ) : (
          <ProductSwipper data={almostSoldOutCardData} />
        )}
      </div>

      <section className="containers pt-[2rem] pb-[1rem]">
        <HeaderText title="Explore our collection" />
        <aside className="grid md:grid-cols-4 grid-cols-2 md:gap-[2rem] gap-[1rem] py-[2rem]">
          {Array?.isArray(categories) &&
            categories?.map((item, index) => {
              return (
                <CategoryCard
                  key={index}
                  img={bestSeller2}
                  name={item?.categoryname}
                  onClick={() => {
                    navigate("/shop");
                  }}
                />
              );
            })}
        </aside>
      </section>

      <section className="containers pb-[2rem]">
        <HeaderText title="Shop the look" />
        <div className="s1100:flex justify-between items-center ">
          <aside className="s1100:w-[40%] w-[100%] s1100:block flex justify-center">
            {" "}
            <div className="md:w-[650px] xl:w-[650px] s1100:w-[500px] w-[100%] ">
              <img
                src={Look || "/placeholder.svg"}
                alt="logo"
                className="w-[100%]"
              />
            </div>
          </aside>
          <aside
            className="sm:flex justify-between items-center s1100:w-[47%] w-[100%] "
            style={{ gap: "1.5rem" }}
          >
            <div className="sm:w-[50%] w-[100%]">
              <ProductCard width="100%" img={Look1} />
            </div>
            <div className="sm:w-[50%] w-[100%]">
              <ProductCard width="100%" img={Look2} />
            </div>
          </aside>
        </div>
      </section>

      <section className="containers">
        <HeaderTextCenter text={"#Beautybytas community"} />
        <aside className="flex justify-between items-center flex-wrap py-[1.5rem]">
          {CommunityData?.map((item, index) => (
            <div key={index} className="md:w-[24%] w-[48%] mb-[1rem] md:mb-0">
              <div className="md:mb-2 mb-1">
                <img
                  src={item?.img || "/placeholder.svg"}
                  alt={item?.tab}
                  className="w-[100%] h-[100%]"
                />
              </div>
              <div
                className="border md:leading-[2rem] leading-[1.3rem] md:h-[80px] h-[50px] flex justify-center items-center w-full text-center md:text-[1.1rem] text-[.8rem] rounded-lg uppercase p-2 md:mt-[1rem] mt-[.5rem]"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {item?.tab}
              </div>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default Home;
