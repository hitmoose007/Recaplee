import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
type Props = {
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
        isSelected ? 'border-[3px] border-[#7E5DEB]' : 'border-[3px] border-transparent'
      }`}
    >
      <div className="flex  md:space-x-10 md:px-6 md:py-3 ">
        <p className="text-[20px] font-bold text-[#705CF6]">{position}.</p>
        <div className="flex flex-col">
          <p className="text-[20px] font-bold text-[#705CF6]">{domain}</p>
          <p className="font-bold  ">{title}</p>
          <a
            href={link}
            className="flex cursor-pointer text-clip text-sm hover:underline md:w-11/12"
          >
            <span className="md:mr-2 truncate block  "> {link}</span>

            <Image src="/linkIcon.svg" width={10} height={10} alt="link icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompetitorCard;
