import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface CustomReactProps {
    review?: any;
}

const StarReview: React.FC<CustomReactProps> = ({ review }) => {
  const totalStars = 5;
  const fullStars = Math.floor(review);
  const halfStar = review % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex gap-[3px] items-center">
      {/* Full Stars */}
     <div className="flex gap-[3px]"> {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color={"#E7AA3D"} />
      ))}
      {/* Half Star */}
      {halfStar && <FaStarHalfAlt color={"#E7AA3D"} />}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} color={"#c5c5c5"} />
      ))}</div>
      <div className="flex items-center text-[.8rem] ps-[10px] ms-[6px] my-[8px]" style={{borderLeft: '2px solid #bbb'}}>{review} Reviews</div>
    </div>
  );
};

export default StarReview;
