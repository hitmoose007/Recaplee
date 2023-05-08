import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Competitor, QuerySummary } from '@/types/my-types';
type Props = {
  competitor: Competitor;
  querySummary: QuerySummary;
};

const AnalysisCard = ({ competitor, querySummary }: Props) => {
  const [contentColor, setContentColor] = useState('');
  const [changesColor, setChangesColor] = useState('');
  const [positionChange, setPositionChange] = useState<number>();
  const contentChangedValue = competitor.content_changed || 0;
  const changesValue = competitor.changes_detected || 0;

  const old_update = new Date(querySummary.old_update).toLocaleDateString();
  const recent_update = new Date(
    querySummary.recent_update
  ).toLocaleDateString();
  useEffect(() => {
    if (contentChangedValue > 25) {
      setContentColor('customRed');
    } else if (contentChangedValue > 10 && contentChangedValue < 25) {
      setContentColor('customYellow');
    } else {
      setContentColor('customGreen');
    }

    if (changesValue > 25) {
      setChangesColor('customRed');
    } else if (changesValue > 10 && changesValue < 25) {
      setChangesColor('customYellow');
    } else {
      setChangesColor('customGreen');
    }
  }, []);

  useEffect(() => {
    if (competitor.last_position && competitor.current_position) {
      setPositionChange(competitor.current_position - competitor.last_position);
    }
  }, []);

  console.log(contentColor, changesColor, ' this is color');
  return (
    <div className="flex items-center justify-around rounded-full bg-white align-middle text-customGray md:space-x-4 md:px-4 md:py-4">
      <div className="flex text-customYellow">
        <p className="text-2xl font-bold text-customPurple ">
          {competitor.current_position || '#'}
        </p>
        {positionChange && (
          <p
            className={`text-xs font-extrabold ${
              positionChange < 0 ? 'text-customRed ' : 'text-customGreen'
            }`}
          >
            {positionChange > 0 && '+'}
            {positionChange}
          </p>
        )}
      </div>
      <div className="flex flex-col ">
        {' '}
        <p className="w-80 truncate text-[20px] font-bold text-customPurple">
          {competitor.title}
        </p>
        <div className="flex  space-x-2">
          <a
            href=""
            className=" w-80 truncate text-sm font-bold text-customGray hover:underline "
          >
            {' '}
            {competitor.link}
          </a>
          <Image src="/linkIcon.svg" width={10} height={10} alt="link icon" />
        </div>
      </div>
      <div className="flex flex-col ">
        <p className="text-center font-bold ">{old_update}</p>
        <p className="text-sm md:mt-1">Compared analysis date</p>
      </div>
      <div className="flex flex-col text-center">
        <p className="font-bold ">{recent_update}</p>
        <p className="text-sm md:mt-1">Most recent update</p>
      </div>
      <div className="flex flex-col text-center">
        <p className={`font-bold   text-${contentColor} `}>
          {competitor.content_changed}%
        </p>
        <p className="text-sm md:mt-1">of content changed</p>
      </div>
      <div className="flex flex-col text-center">
        <p className={`font-bold    text-${changesColor} `}>{changesValue}</p>
        <p className="text-sm md:mt-1">Changes detected</p>
      </div>

      {competitor?.changes_detected || 0 > 0 ? (
        <button
          type="submit"
          className="flex cursor-pointer justify-center space-x-5 rounded-full bg-[#705CF6] font-bold text-white hover:brightness-90  md:px-12 md:py-2"
        >
          <Image
            src="/landscapeIcons/simpleGlass.svg"
            width={20}
            height={29}
            alt=""
            className="mt-[2px] md:-ml-8"
          />
          <p>Analyse</p>
        </button>
      ) : (
        <button className=" cursor pointer flex justify-center rounded-full border-[3px] border-customRed text-sm font-bold text-customRed hover:brightness-90 md:px-[35px] md:py-2">
          Not Available
        </button>
      )}
    </div>
  );
};

export default AnalysisCard;
