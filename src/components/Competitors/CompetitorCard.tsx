import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
type Props = {
  customCompetitor?: boolean;
  position: number;
  title: string;
  link: string;
  domain: string;
  handleSelectCompetitor: (competitorKey: number) => void;
};

const CompetitorCard = ({
  position,
  title,
  link,
  customCompetitor = false,
  domain,
  handleSelectCompetitor,
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      onClick={() => {
        handleSelectCompetitor(position);
        setIsSelected(!isSelected);
      }}
      className={`h-[101px] w-[100%] cursor-pointer  rounded-[30px] bg-white hover:brightness-95 ${
        isSelected
          ? 'border-[3px] border-[#7E5DEB]'
          : 'border-[3px] border-transparent'
      }`}
    >
      <div className="flex  md:space-x-10 md:px-6 md:py-3 ">
        <p className="text-[20px] font-bold text-[#705CF6]">
          {customCompetitor ? '#' : position}
        </p>
        <div className="flex w-full flex-col">
          <div className="flex justify-between ">
            <p className="text-[20px] font-bold text-[#705CF6]">{domain}</p>
            {customCompetitor && (
              <Image
                className="brightness-50"
                src="/deleteIcon.svg"
                width={20}
                height={20}
                alt="custom icon"
              />
            )}
          </div>

          <p className="font-bold  ">{title}</p>

          <a
            href={link}
            className="flex cursor-pointer text-clip text-sm hover:underline md:w-11/12"
          >
            <span className="block truncate md:mr-2  "> {link}</span>

            <Image src="/linkIcon.svg" width={10} height={10} alt="link icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompetitorCard;
