import React from "react";

interface CustomProps {
  title?: string;
  description?: string;
}

const HeaderText: React.FC<CustomProps> = ({ title, description }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <aside>
        <div
          className="headerText flex-shrink-0"
          style={{ fontFamily: "displayRegular" }}
        >
          {title}
        </div>
        <div className="text-gray-600">{description}</div>
      </aside>
      <div className="border-t flex-grow"></div>
    </div>
  );
};

export default HeaderText;
