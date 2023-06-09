import React from 'react'
import Image from 'next/image'
type Props = {
    description: string;
}

const HelperHeader = ({description}: Props) => {
  return (
      
    <div className="flex items-start md:items-stretch  space-x-4 md:ml-[3px]  md:flex-row ">
      <Image
        src='/headerIcons/helperIcon.svg'
        alt="logo"
        width={20}
        height={20}
        className=""
      />
      <div className="text-[#4B5563]">{description}</div>
    </div>
  );
};
  
export default HelperHeader