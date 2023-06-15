import React, { useState, useContext } from 'react';
import Image from 'next/image';
import validUrl from 'valid-url';
import { TotalCustomCompetitorsContext } from '../../context/TotalCustomCompetitorsContext';
import { Competitor } from '@prisma/client';

import {useUserContext} from '@/context/user';
type Props = {
    customCompetitorArray: string[];
    queryResult: Competitor[];
  setCustomCompetitorArray: React.Dispatch<React.SetStateAction<string[]>>;
  totalCustomCompetitors: number;
  setTotalCustomCompetitors: (totalCustomCompetitors: number) => void;
  handleSelectCompetitor: (competitorKey: string) => void;
};

const CustomCompetitorInput = ({
    handleSelectCompetitor,
    customCompetitorArray,
    queryResult,
  setCustomCompetitorArray,
  totalCustomCompetitors,
  setTotalCustomCompetitors,
}: Props) => {
  const [competitorInput, setCompetitorInput] = useState('');
  //   const [totalCustomCompetitors, setTotalCompetitors] = useState(0);
  const{user} = useUserContext();

  const onSubmit = (e: any) => {
    e.preventDefault();

    //check if custom competitor is already in the array
    if (customCompetitorArray.includes(competitorInput) || queryResult.find((competitor) => competitor.link === competitorInput)) {
        alert('This competitor is already in the list');
        return;
    }

    if (!validUrl.isUri(competitorInput)) {
      alert('Please enter a valid URL');
      return;
    }

    if (totalCustomCompetitors === user.maxCustomScrape) {
      alert('You have reached ur custom competitor limit');
      return;
    }
    if (competitorInput === '') {
      alert('You must enter a competitor');
      return;
    }
    handleSelectCompetitor(competitorInput);
    setTotalCustomCompetitors(totalCustomCompetitors + 1);

    setCustomCompetitorArray((prevArray) => [...prevArray, competitorInput]);
    
    setCompetitorInput('');
  };

  

  return (
    <div className="md:flex md:flex-col mt-2 border-dotted  border-[3px] rounded-[25px] border-customPurple   flex h-24 py-2 w-full flex-col justify-between   px-4 ">
      

        <div className="flex justify-between font-bold  ">
          <span className="text-customPurple">
            Insert a link to a competitor &apos;s page:
          </span>
          <span className="text-customGray">{totalCustomCompetitors}/{user.maxCustomScrape}</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <div className="flex justify-between space-x-4 md:h-[34px]">
            <input
            placeholder='https://aaaa.com/aaa-bbb-cccc-dddd'
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
  );
};

export default CustomCompetitorInput;
