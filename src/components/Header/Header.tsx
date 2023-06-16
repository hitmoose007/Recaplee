import React from 'react';
import Image from 'next/image';
type Props = {
  svgPath: string;
  description: string;
  isBookIcon?: boolean;
};

const Header = ({ svgPath, description, isBookIcon }: Props) => {
  return (
    <div className="flex space-x-2 text-black md:flex-row md:space-x-4   ">
      <Image
        src={svgPath}
        alt="logo"
        width={isBookIcon ? 20 : 25}
        height={25}
        className=""
      />
      <div className=" text-2xl font-bold md:text-[32px]">{description}</div>
    </div>
  );
};

export default Header;
