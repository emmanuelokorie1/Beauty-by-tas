import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footerr() {
  const data = [
    {
      link: "https://www.instagram.com/beautybytas.co?igsh=MWl5cGd4bXlrem5mbg==",
      Icon: AiFillInstagram
    },
    {
      link: "https://x.com/beautybytas?s=21&t=xGYreIzgpLm9xl3R2RzjzA",
      Icon: FaSquareXTwitter
    },
    {
      link: "https://www.tiktok.com/@beautybytas.co?_t=ZM-8xyhdbXaaL2&_r=1",
      Icon: AiFillTikTok
    },
  ];
  return (
    <div className="bg-primary-background pxMedia pb-[6rem] md:pb-0">
      <section className="sm:flex justify-between border-t-[1px] border-gray-300 py-[1rem] ">
        <aside className="flex justify-center sm:justify-end gap-[1rem] pb-[1rem] items-center">
          <div className="flex justify-center  items-center sm:gap-[1rem] ">
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM7.5 10C7.5 10.5247 7.6651 11.0361 7.9719 11.4618C8.2787 11.8874 8.71165 12.2058 9.20943 12.3717C9.70721 12.5376 10.2446 12.5427 10.7454 12.3863C11.2463 12.2298 11.6852 11.9198 12 11.5C12.0996 11.3674 12.2477 11.2798 12.4119 11.2564C12.5761 11.233 12.7428 11.2758 12.8754 11.3754C13.008 11.4749 13.0956 11.6231 13.119 11.7873C13.1424 11.9514 13.0996 12.1182 13 12.2508C12.5277 12.8802 11.8692 13.3451 11.118 13.5796C10.3668 13.8141 9.56083 13.8064 8.81427 13.5574C8.06771 13.3084 7.4184 12.8309 6.95829 12.1925C6.49818 11.554 6.25059 10.787 6.25059 10C6.25059 9.21302 6.49818 8.44599 6.95829 7.80753C7.4184 7.16908 8.06771 6.69155 8.81427 6.44259C9.56083 6.19363 10.3668 6.18585 11.118 6.42036C11.8692 6.65486 12.5277 7.11976 13 7.74922C13.0493 7.81488 13.0852 7.88961 13.1056 7.96914C13.126 8.04866 13.1306 8.13143 13.119 8.21272C13.1074 8.29401 13.08 8.37222 13.0382 8.44289C12.9964 8.51357 12.9411 8.57531 12.8754 8.62461C12.8097 8.67391 12.735 8.70979 12.6555 8.7302C12.5759 8.75062 12.4932 8.75518 12.4119 8.7436C12.3306 8.73203 12.2524 8.70456 12.1817 8.66277C12.111 8.62097 12.0493 8.56566 12 8.5C11.6852 8.08024 11.2463 7.77017 10.7454 7.61372C10.2446 7.45727 9.70721 7.46237 9.20943 7.62829C8.71165 7.79422 8.2787 8.11256 7.9719 8.53822C7.6651 8.96389 7.5 9.47529 7.5 10Z"
                  fill="#000914"
                />
              </svg>
            </div>

            <div>2024 Beautybytas.com</div>
          </div>

          <div>All rights reserved.</div>
        </aside>

        <aside className="flex justify-center sm:justify-end gap-[2rem] items-center">
          {data?.map((e, i) => {
            return (
              <a href={e?.link} target="_blank" key={i}>
                <e.Icon color={"#000914"} size={30} />
              </a>
            );
          })}

        </aside>
      </section>
    </div>
  );
}

export default Footerr;
