import React from 'react';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';

type Props = {
  selectedCompetitors?: number[];
  totalCustomCompetitors?: number;
  setTotalCustomCompetitors?: (totalCustomCompetitors: number) => void;
  customCompetitor?: boolean;
  setCustomCompetitorArray?: React.Dispatch<React.SetStateAction<string[]>>;
  position: number;
  title: string;
  link: string;
  domain: string;
  handleSelectCompetitor: (competitorKey: number) => void;
};

const CompetitorCard = ({
  selectedCompetitors,
  totalCustomCompetitors,
  setTotalCustomCompetitors,
  setCustomCompetitorArray,
  position,
  title,
  link,
  customCompetitor = false,
  domain,
  handleSelectCompetitor,
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const onDelete = () => {
  

    setIsSelected(false);

    if (setCustomCompetitorArray) {
      setCustomCompetitorArray((prevArray) =>
        prevArray.filter((item) => {
          return item !== title;
        })
      );
      if (setTotalCustomCompetitors && totalCustomCompetitors)
        setTotalCustomCompetitors(totalCustomCompetitors - 1);
    }
  };

  useEffect(() => {
    if (selectedCompetitors) {
        if (selectedCompetitors.includes(position)) {
            setIsSelected(true);
        }
    }
    }, [selectedCompetitors]);
    
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
      <div className="flex  space-x-10 px-6 py-3 ">
        <p className="text-[20px] font-bold text-[#705CF6]">
          {customCompetitor ? '#' : position}
        </p>
        <div className="flex w-full flex-col">
          <div className="flex justify-between ">
            <p className="text-[17px] md:text-[20px] font-bold text-[#705CF6] w-10/12 truncate">{domain}</p>
            {customCompetitor && (
              <Image
                onClick={() => {
                  handleSelectCompetitor(position);
                  if (!isSelected) {
                    handleSelectCompetitor(position);
                  }
                  onDelete();
                }}
                className="brightness-50"
                src="/deleteIcon.svg"
                width={20}
                height={20}
                alt="custom icon"
              />
            )}
          </div>

          <p className="font-bold truncate w-8/12 ">{title}</p>

          <div className="flex w-9/12 truncate ">
            <a
              href={link}
              className=" cursor-pointer text-clip text-sm hover:underline "
            >
              <span className=" mr-2  "> {link}</span>
            </a>
            <a
              href={link}
              className="flex cursor-pointer items-center truncate "
            >
              <Image
                src="/linkIcon.svg"
                width={10}
                height={10}
                alt="link icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorCard;
