import React from 'react';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';

type Props = {
  selectedCompetitors?: string[];
  totalCustomCompetitors?: number;
  setTotalCustomCompetitors?: (totalCustomCompetitors: number) => void;
  customCompetitor?: boolean;
  setCustomCompetitorArray?: React.Dispatch<React.SetStateAction<string[]>>;
  position: number;
  title: string;
  link: string;
  domain: string;
  handleSelectCompetitor: (competitorKey: string) => void;
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
      if (selectedCompetitors.includes(link)) {
        setIsSelected(true);
      }
    }
  }, [selectedCompetitors]);

  return (
    <div
      onClick={() => {
        handleSelectCompetitor(link);

        setIsSelected(!isSelected);
      }}
      className={`h-[101px] w-full cursor-pointer  rounded-[30px] bg-white hover:brightness-95 ${
        isSelected
          ? 'border-[3px] border-[#7E5DEB]'
          : 'border-[3px] border-transparent'
      }`}
    >
      <div className="flex  space-x-10 px-6 py-3 ">
        <p className="text-[20px] font-bold text-[#705CF6]">
          {customCompetitor ? '#' : position}
        </p>
        <div className="flex w-9/12 md:w-11/12 flex-col">
          <div className="flex justify-between ">
            <p className="w-10/12 truncate text-[17px] font-bold text-[#705CF6] md:text-[20px]">
              {domain}
            </p>
            {customCompetitor && (
              <Image
                onClick={() => {
                  handleSelectCompetitor(link);
                  if (!isSelected) {
                    handleSelectCompetitor(link);
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

          <p className="w-8/12 truncate font-bold ">{title}</p>

          <div className="flex w-9/12 truncate max-w-40 ">
            <a
              href={link}
              className=" cursor-pointer mr-2  text-clip text-sm hover:underline "
            >
                {link}
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
