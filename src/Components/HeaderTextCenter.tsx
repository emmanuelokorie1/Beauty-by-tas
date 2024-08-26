import React from "react";

interface CustomProps {
  text: string;
}

const HeaderTextConter: React.FC<CustomProps> = ({ text }) => {
  return <div className="headerText flex-shrink-0 text-center">{text}</div>;
};

export default HeaderTextConter;
