import { useState } from "react";
import ProductDecriptions from "../../Components/ProductDecriptions";
import HeaderText from "../../Components/HeaderText";
import ProductSwipper from "../../Components/ProductSwipper";
import ProductCard from "../../Components/ProductCard";

function Bag() {
  const CardData = [
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
    <ProductCard width="100%" />,
  ];

  const tabNav = [
    "OVERVIEW",
    "HOW TO USE",
    "INGREDIENTS",
    "BENEFITS",
    "SUSTAINABLE PACKAGING",
  ];
  const [tabNavState, setTabNavState] = useState("OVERVIEW");
  return (
    <div>
      <ProductDecriptions />
      <section className="mt-[6rem] containers">
        <div>
          <div className="flex justify-evenly px-[3rem] border-b ">
            {tabNav?.map((e, i) => {
              return (
                <div
                  onClick={() => setTabNavState(e)}
                  key={i}
                  className={`cursor-pointer px-[.5rem] text-[.9rem] transition-all py-[.5rem] ${
                    e === tabNavState
                      ? "border-b-[2px] border-primary-deepRed text-primary-deepRed font-semibold"
                      : "text-primary-textColor2 border-b-[2px] border-transparent"
                  }`}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="containers py-[2rem]">
        <HeaderText text="Similar Products" />
        <ProductSwipper data={CardData} />
      </section>
    </div>
  );
}

export default Bag;
