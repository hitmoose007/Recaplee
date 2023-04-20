import React from 'react';
import Image from 'next/image';
type Props = {};

const BackButton = (props: Props) => {
  return (
    <div className="flex justify-between  md:w-[75px] items-center ">
      <button>
        <Image src="/backButton.svg" alt="back" width={25} height={25} className="hover:brightness-75"/>
      </button>
      <p className="text-[#4B5563] ">Back</p>
    </div>
  );
};

export default BackButton;
