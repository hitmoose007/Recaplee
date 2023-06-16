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
      className={`w-full cursor-pointer  rounded-[30px] bg-white hover:brightness-95 ${
        isSelected
          ? 'border-[3px] border-[#7E5DEB]'
          : 'border-[3px] border-transparent'
      }`}
    >
      <div className="flex flex-col px-6 py-3 md:flex-row md:space-x-10 ">
        <p className="w-full text-[20px] font-bold text-[#705CF6] md:w-auto">
          {customCompetitor ? '#' : position}.
        </p>
        <div className="flex w-full flex-col md:w-11/12">
          <div className="flex justify-between ">
            <p className="truncate text-[17px] font-bold text-[#705CF6] md:w-10/12 md:text-[20px]">
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
          <p className="w-full truncate font-bold md:w-11/12 ">{title}</p>
          <div className="flex w-full truncate md:w-11/12">
            <a
              target="_blank"
              href={link}
              className="mr-2 w-8/12 cursor-pointer  overflow-hidden overflow-ellipsis text-sm hover:underline md:w-fit "
            >
              {link}
            </a>
            <a
              target="_blank"
              href={link}
              className="flex w-4/12 cursor-pointer items-center md:w-fit"
            >
              <Image
                src="/linkIcon.svg"
                width={10}
                height={10}
                alt="link icon"
                className=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorCard;
