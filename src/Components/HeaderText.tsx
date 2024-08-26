import React from 'react';

interface CustomProps {
  text: string;
}

const HeaderText: React.FC<CustomProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <div className="headerText flex-shrink-0" style={{fontFamily: 'displayRegular'}}>{text}</div>
      <div className="border-t flex-grow"></div>
    </div>
  );
};

export default HeaderText;
