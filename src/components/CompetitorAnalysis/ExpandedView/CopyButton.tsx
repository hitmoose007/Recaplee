import React from 'react'
import { IoCopyOutline } from 'react-icons/io5';

type Props = {}

const CopyButton = ({ text }: { text: string }) => {
  return (
    <span
      onClick={() => navigator.clipboard.writeText(text)}
      className="  hover:cursor-pointer "
    >
      <IoCopyOutline size={15} color="gray" />
    </span>
  );
};


export default CopyButton