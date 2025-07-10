import React from "react";

interface CategoryCardProps {
  img: string;
  name: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ img, name, onClick }) => {
  return (
    <div
      className="relative cursor-pointer rounded-lg overflow-hidden group h-[200px] w-full flex items-center justify-center"
      onClick={onClick}
      style={{ minHeight: 150 }}
    >
      <img
        src={img || "/placeholder.svg"}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <span className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-lg px-4">
          {name}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard; 