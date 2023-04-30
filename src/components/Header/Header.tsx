import React from 'react';
import Image from 'next/image';
type Props = {
  svgPath: string;
  description: string;
  isBookIcon?: boolean;
};

const Header = ({ svgPath, description, isBookIcon }: Props) => {
  return (
    <div className="flex space-x-4">
      <Image
        src={svgPath}
        alt="logo"
        width={isBookIcon ? 20 : 25}
        height={25}
        className=""
      />
      <div className="text-[32px] font-bold">{description}</div>
    </div>
  );
};

export default Header;
