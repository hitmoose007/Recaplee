import React, { useState, useContext } from 'react';
import Image from 'next/image';
import validUrl from 'valid-url';
import { TotalCustomCompetitorsContext } from '../../context/TotalCustomCompetitorsContext';
type Props = {
  setCustomCompetitorArray: React.Dispatch<React.SetStateAction<string[]>>;
  totalCustomCompetitors: number;
  setTotalCustomCompetitors: (totalCustomCompetitors: number) => void;
};

const CustomCompetitorInput = ({
  setCustomCompetitorArray,
  totalCustomCompetitors,
  setTotalCustomCompetitors,
}: Props) => {
  const [competitorInput, setCompetitorInput] = useState('');
  //   const [totalCustomCompetitors, setTotalCompetitors] = useState(0);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!validUrl.isUri(competitorInput)) {
      alert('Please enter a valid URL');
      return;
    }

    if (totalCustomCompetitors === 3) {
      alert('You can only add 3 competitors');
      return;
    }
    if (competitorInput === '') {
      alert('You must enter a competitor');
      return;
    }
    setTotalCustomCompetitors(totalCustomCompetitors + 1);

    setCustomCompetitorArray((prevArray) => [...prevArray, competitorInput]);
    setCompetitorInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src="/competitorBorder.svg"
        width={1000}
        height={100}
        alt="competitor border"
      />

      <div className="relative bottom-24 mt-2 flex h-16 w-full flex-col justify-between  space-y-4 px-8 ">
        <div className="flex justify-between font-bold ">
          <span className="text-customPurple">
            Insert a link to a competitor's page:
          </span>
          <span className="text-customGray">{totalCustomCompetitors}/3</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <div className="flex justify-between space-x-4 md:h-[34px]">
            <input
              value={competitorInput}
              onChange={(e) => setCompetitorInput(e.target.value)}
              type="text"
              className=" w-full  rounded-full font-bold outline-none md:pl-4"
            />
            <button
              type="submit"
              className="flex  items-center space-x-3 rounded-full  bg-customPurple px-8   hover:brightness-90 "
            >
              <Image
                src="/whitePlusIcon.svg"
                width={15}
                height={10}
                alt="plus icon"
                className="-ml-4"
              />

              <span className="text-sm text-white">Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomCompetitorInput;