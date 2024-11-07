import React from 'react';
import { Oval } from 'react-loader-spinner';

interface CustomButtonProps {
  loading?: boolean;
  text: string;
  classNames?: string;
  onClick: () => void;
  icon?: React.ReactNode; // Add this line
}

const CustomButton: React.FC<CustomButtonProps> = ({ loading, text, classNames, onClick }) => {
  return (
    <button className={`flex items-center justify-center p-2 rounded-md ${classNames}`} onClick={onClick}>
      {loading ? (
        <Oval
          visible={true}
          height={24}
          width={24}
          color="white"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="text-white"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
