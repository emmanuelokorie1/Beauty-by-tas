import React from 'react';
import { Oval } from 'react-loader-spinner';

interface CustomButtonProps {
  loading?: boolean;
  text: string;
  classNames?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ loading, text, classNames }) => {
  return (
    <button className={`flex items-center justify-center p-2 rounded-md ${classNames}`}>
      {loading ? (
        <Oval
          visible={true}
          height={24}
          width={24}
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
