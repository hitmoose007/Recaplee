import React from 'react';
import Image from 'next/image';
type Props = {
  handleSave: () => void;
};

const SaveButton = ({ handleSave }: Props) => {
  return (
    <button
      onClick={() => {
        handleSave();
      }}
      className="flex rounded-full bg-[#61CE70] text-sm text-white  hover:brightness-90 space-x-2 p-2 px-4"
    >
      <Image src="/saveIcon.svg" width={20} height={20} alt="save icon" />
      <span> Save and Proceed</span>
    </button>
  );
};

export default SaveButton;
