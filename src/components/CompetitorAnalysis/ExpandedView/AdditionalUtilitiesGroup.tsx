import React from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import wordsCount from 'words-count';
type Props = {
  index: number;
  toBeCopiedText: string;
};

const AdditionalUtilitiesGroup = ({ index, toBeCopiedText }: Props) => {
  return (
    <div className="md:flex md:flex-col justify-between text-[9px] font-normal text-customGray  hidden">
      <span className="flex justify-end">#{index + 1}</span>
      <div className="flex flex-col justify-end">
        <span className="flex justify-end">
          {' '}
          <CopyButton text={toBeCopiedText} />
        </span>
        <span className="flex justify-end whitespace-nowrap">
          {' '}
          {(toBeCopiedText.split(' ').length)} words
        </span>
      </div>
    </div>
  );
};
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

export default AdditionalUtilitiesGroup;
