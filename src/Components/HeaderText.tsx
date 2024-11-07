import React from 'react';

interface CustomProps {
  title?: string;
}

const HeaderText: React.FC<CustomProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-[1rem]">
      <div className="headerText flex-shrink-0" style={{ fontFamily: 'displayRegular' }}>
        {title}
      </div>
      <div className="border-t flex-grow"></div>
    </div>
  );
};

export default HeaderText;
