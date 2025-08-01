"use client";

import { NavLink } from "react-router-dom";
import HeaderText from "../../Components/HeaderText";
import HeaderTextCenter from "../../Components/HeaderTextCenter";
import HomeCarosel from "../../Components/HomeCarosel";
import ProductCard from "../../Components/ProductCard";
import ProductSwipper from "../../Components/ProductSwipper";

// import skinCare from "../../assets/home/skinCare.svg";
// import bodyCare from "../../assets/home/bodyCare.svg";
// import giftSet from "../../assets/home/giftSet.svg";
// import addOns from "../../assets/home/addOns.svg";

// import Look from "../../assets/home/look.svg";
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
import { images } from "../../constants";

function Home() {
  // Debug: Log the images object to see what's available
  console.log("Images object:", images);
  console.log("textLogo value:", images?.textLogo);

  const {
    bestSeller1,
    bestSeller2,
    bestSeller3,
    giftImg,
    lipsBalm,
    adsOn,
    bodyOil,
    lipCrayon,
    lipJelly,
    lipGloss,
    lipOil,

    look,

    // community1,
  } = images;
  const bestSeller = [bestSeller1, bestSeller2, bestSeller3];

  const CommunityData = [
    {
      img: community1,
      tab: "Trying out the lip crayons",
      link: "https://www.instagram.com/reel/DBQxYLdoO9i/?igsh=MTliZTRwN3doc2dzNQ==",
    },
    {
      img: community2,
      tab: "ChocoLatte served hot by Martha",
      link: "https://www.instagram.com/p/C8NN5Y9ISR4/?igsh=MXgxc202aHJiejRxag==",
    },
    {
      img: community3,
      tab: "True friendship is in sharing your lip glosses",
      link: "https://www.instagram.com/p/C8NN5Y9ISR4/?igsh=MXgxc202aHJiejRxag==",
    },
    {
      img: community4,
      tab: "Juicy Lips Activated with Tas",
      link: "https://www.instagram.com/reel/DFV0hdLImKO/?igsh=MTE1NXN6aWNkaDl2ZA==",
    },
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
  // const { data: bestSellerData, isLoading: bestSellerLoader } = useBestSeller();
  const { data: newProductData, isLoading: newProductLoader } = useNewProduct();
  const { data: almostSoldOutData, isLoading: almostSoldOutLoader } =
    useAlmostSoldOut();

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  // console.log(categories);

  const extraCategory = {
    categoryid: "0a7399b5-b1e2-4399-b148-47ee0724c1ad",
    categoryname: "Lip Oil",
    createdat: "2025-06-04 16:34:35",
    productcount: 0,
    status: true,
  };

  const allCategories = [...categories, extraCategory];

  // const CardData = Array?.isArray(bestSellerData?.data)
  //   ? bestSellerData?.data?.map((item: any, index: number) => {
  //       return (
  //         <ProductCard
  //           key={index}
  //           width="100%"
  //           img={item?.images && item?.images[0]}
  //           loading={bestSellerLoader}
  //           description={item?.description}
  //           productName={item?.productName}
  //           price={item?.price}
  //           id={item?.categoryId}
  //           totalStock={item?.totalStock}
  //         />
  //       );
  //     })
  //   : [];

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
            id={item?.productId}
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
            id={item?.productId}
            totalStock={item?.totalStock}
          />
        );
      })
    : [];

  console.log(newProductData);

  const navigate = useNavigate();

  useEffect(() => {
    getUniqueIdentifier();
  }, []);

  return (
    <div>
      <HomeCarosel />
      <div className="containers ">
        {/* <div className="py-[2rem]">
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
        </div> */}

        <div className="mt-4">
          <HeaderText title="Let’s Get Glazed" />
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
          <HeaderText title="Discover our best selling Lip Jelly Collection" />

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

      <section className="shadow-xl rounded-3xl border border-primary-deepRed/20 flex flex-col md:flex-row my-12 xl:mx-[5rem] sm:mx-12 mx-4 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
        <aside className="md:w-1/2 w-full flex items-center justify-center p-4 md:p-6 lg:p-8 relative h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="relative z-20 w-full h-full flex items-center justify-center">
            <div className="w-[200px] h-[200px] md:w-[250px] md:h-[280px] lg:w-[380px] lg:h-[280px] flex items-center justify-center">
              {images?.textLogo ? (
                <img
                  src={images.textLogo}
                  alt="Beauty by TAS Logo"
                  className="w-full h-full object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "100%",
                    height: "100%",
                  }}
                  onLoad={() =>
                    console.log("Image loaded successfully:", images.textLogo)
                  }
                  onError={(e) => {
                    console.error("Image failed to load:", images.textLogo);
                    console.error("Error details:", e);
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 p-4 text-center">
                  <div className="text-4xl mb-2">🛍️</div>
                  <div className="text-sm font-medium">Beauty by TAS</div>
                  <div className="text-xs opacity-75">Logo</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Decorative cream background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-100 to-orange-100 rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full opacity-60"></div>
          </div>
        </aside>

        <aside className="md:w-1/2 w-full flex flex-col justify-center bg-gradient-to-br from-primary-deepRed to-primary-deepRed/90 text-white px-8 md:px-12 py-10 md:py-12 text-center md:text-left relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">
              Why Choose{" "}
              <span className="text-primary-color">Beauty by TAS</span>?
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-base md:text-lg leading-relaxed opacity-95">
                We believe that feeling glamorous shouldn't cost a fortune. Our
                customers rely on us to help them feel beautiful without
                breaking the bank.
              </p>
              <p className="text-base md:text-lg leading-relaxed opacity-95">
                From makeup to accessories, we offer a wide range of top-notch
                products at amazing prices. Come join us in celebrating beauty,
                diversity, and empowerment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
              <NavLink
                to="/about-us"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-primary-deepRed font-semibold shadow-lg hover:bg-primary-deepRed hover:text-white border-2 border-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 transform hover:scale-105 group/btn"
              >
                <span className="text-sm md:text-base">
                  LEARN MORE ABOUT US
                </span>
                <IoIosArrowForward className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </NavLink>

              <NavLink
                to="/shop"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-transparent text-white font-semibold border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <span className="text-sm md:text-base">SHOP NOW</span>
              </NavLink>
            </div>
          </div>
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
        <HeaderText title="Find Your Match" />
        <aside className="grid md:grid-cols-4 grid-cols-2 md:gap-[2rem] gap-[1rem] py-[2rem]">
          {categoriesLoading ? (
            // Loading skeleton for category cards
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-pulse"
              >
                {/* Image skeleton */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                
                {/* Content skeleton */}
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                </div>
                
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            ))
          ) : Array?.isArray(allCategories) ? (
            allCategories?.map((item, index) => {
              const { categoryname } = item;
              return (
                <CategoryCard
                  key={index}
                  img={
                    categoryname === "Gift"
                      ? giftImg
                      : categoryname === "Lip Balm"
                      ? lipsBalm
                      : categoryname === "Add-ons"
                      ? adsOn
                      : categoryname === "Body Oils"
                      ? bodyOil
                      : categoryname === "Lip Crayon"
                      ? lipCrayon
                      : categoryname === "Lip Jelly"
                      ? lipJelly
                      : categoryname === "Lip Gloss"
                      ? lipGloss
                      : categoryname === "Lip Oil"
                      ? lipOil
                      : bestSeller2
                  }
                  name={categoryname}
                  onClick={() => {
                    navigate("/shop");
                  }}
                />
              );
            })
          ) : (
            // Empty state
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">No Categories Available</h3>
              <p className="text-sm text-gray-400">Check back later for our product categories</p>
            </div>
          )}
        </aside>
      </section>

      <section className="containers pb-[2rem]">
        <HeaderText title="Shop the look" />
        <div className="s1100:flex justify-between items-center ">
          <aside className="s1100:w-[40%] w-[100%] s1100:block flex justify-center">
            <div className="md:w-[650px] h-[470px] xl:w-[650px] s1100:w-[500px] w-[100%] ">
              <img
                src={look || "/placeholder.svg"}
                alt="logo"
                className="w-[100%] h-[100%] object-cover rounded-lg"
              />
            </div>
          </aside>
          <aside
            className="sm:flex justify-between items-center s1100:w-[47%] w-[100%] "
            style={{ gap: "1.5rem" }}
          >
            <div className="sm:w-[50%] w-[100%]">
              <ProductCard width="100%" img={Look1} totalStock={0} />
            </div>
            <div className="sm:w-[50%] w-[100%]">
              <ProductCard width="100%" img={Look2} totalStock={0} />
            </div>
          </aside>
        </div>
      </section>

      <section className="containers">
        <HeaderTextCenter text={"#Beautybytas community"} />
        <aside className="flex justify-between items-center flex-wrap py-[1.5rem]">
          {CommunityData?.map((item, index) => (
            <a
              href={item?.link}
              target="_blank"
              key={index}
              className="md:w-[24%] w-[48%] mb-[1rem] md:mb-0 cursor-pointer"
            >
              <div className="md:mb-2 mb-1">
                <img
                  src={item?.img}
                  alt={item?.tab}
                  className="w-[100%] h-[100%]"
                />
              </div>
              <div className="border md:leading-[2rem] line-clamp-2 leading-[1.3rem] md:h-[80px] h-[50px] flex justify-center items-center w-full text-center md:text-[1.1rem] text-[.8rem] rounded-lg uppercase p-2 md:mt-[1rem] mt-[.5rem]">
                {item?.tab}
              </div>
            </a>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default Home;
