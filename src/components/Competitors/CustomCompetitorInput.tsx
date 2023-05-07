import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  setCustomCompetitorArray: React.Dispatch<React.SetStateAction<string[]>>;
};

const CustomCompetitorInput = ({ setCustomCompetitorArray }: Props) => {
  const [competitorInput, setCompetitorInput] = useState('');
  const [totalCompetitors, setTotalCompetitors] = useState(0);

  const onSubmit = (e: any) => {
    console.log('submit');
    e.preventDefault();
    if (totalCompetitors === 3) {
      alert('You can only add 3 competitors');
      return;
    }
    if (competitorInput === '') {
      alert('You must enter a competitor');
      return;
    }
    setTotalCompetitors(totalCompetitors + 1);
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

      <div className="relative bottom-24 mt-1 flex h-20 w-full flex-col justify-between  px-8 ">
        <div className="flex justify-between font-bold ">
          <span className="text-customPurple">
            Insert a link to a competitor's page:
          </span>
          <span className="text-customGray">{totalCompetitors}/3</span>
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
