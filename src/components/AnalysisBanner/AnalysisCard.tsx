import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Competitor, QuerySummary } from '@/types/my-types';
import { PageContext } from '@/context/PageContext';
import { PageView } from '@/utils/enums';
import { useContext } from 'react';
import { useSerpContext } from '@/context/SerpChangesContext';
type Props = {
  competitor: Competitor;
  querySummary: QuerySummary;
  setCompetitorAnalysed: (competitor: Competitor) => void;
};

const AnalysisCard = ({
  setCompetitorAnalysed,
  competitor,
  querySummary,
}: Props) => {
  let contentColorValue = '';
  let changesColorValue = '';
  const [positionChange, setPositionChange] = useState<number>();
  const { setPage } = useContext(PageContext);
  const old_update = new Date(querySummary.old_update).toLocaleDateString();
  const recent_update = new Date(
    querySummary.recent_update
  ).toLocaleDateString();

  if (competitor.content_changed !== undefined) {
    if (competitor.content_changed > 25) {
      contentColorValue = 'customRed';
    } else if (
      competitor.content_changed > 10 &&
      competitor.content_changed < 25
    ) {
      contentColorValue = 'customYellow';
    } else {
      contentColorValue = 'customGreen';
    }
  }

  if (competitor.changes_detected !== undefined) {
    if (competitor.changes_detected > 25) {
      changesColorValue = 'customRed';
    } else if (
      competitor.changes_detected > 10 &&
      competitor.changes_detected < 25
    ) {
      changesColorValue = 'customYellow';
    } else {
      changesColorValue = 'customGreen';
    }
  }

  useEffect(() => {
    if (competitor.last_position && competitor.current_position) {
      setPositionChange(competitor.last_position - competitor.current_position);
    }
  }, [competitor]);

  return (
    <div className="flex flex-col items-center justify-around space-y-2 rounded-[50px] bg-white py-6 align-middle text-customGray md:flex-row md:space-x-4 md:space-y-0 md:rounded-full md:px-4 md:py-4">
      <div className="flex w-3 text-customYellow">
        <p className="text-2xl font-bold text-customPurple ">
          {competitor.current_position || '#'}.
        </p>
        {positionChange !== undefined && positionChange !== 0 && (
          <p
            className={`text-xs font-extrabold ${
              positionChange < 0 ? 'text-customRed ' : 'text-customGreen'
            }`}
          >
            {positionChange > 0 && '+'}
            {positionChange !== 0 && positionChange}
          </p>
        )}
      </div>
      <div className="flex flex-col   ">
        {' '}
        <p className=" w-60 truncate text-center text-[20px] font-bold text-customPurple md:w-80 md:text-start">
          {competitor.title}
        </p>
        <div className="flex  w-96 space-x-2 truncate">
          <a
            href={competitor.link}
            target="_blank"
            className="mx-auto w-auto  overflow-hidden overflow-ellipsis text-sm font-bold text-customGray hover:underline md:mx-0 md:w-fit"
          >
            {competitor.link}
          </a>

          <Image src="/linkIcon.svg" width={10} height={10} alt="link icon" />
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-col ">
        <p className="text-center font-bold ">{old_update}</p>
        <p className="text-sm md:mt-1 ">Compared analysis date</p>
      </div>
      <div className="hidden text-center lg:flex lg:flex-col">
        <p className="font-bold ">{recent_update}</p>
        <p className="text-sm md:mt-1">Most recent update</p>
      </div>
      <div className="hidden text-center md:flex md:flex-col">
        <p className={`font-bold   text-${contentColorValue} `}>
          {competitor.content_changed || 0}%
        </p>
        <p className="text-sm md:mt-1">of content changed</p>
      </div>
      <div className="flex flex-col text-center">
        <p className={`font-bold    text-${changesColorValue} `}>
          {competitor.changes_detected || 0}
        </p>
        <p className="text-sm md:mt-1">Changes detected</p>
      </div>

      {competitor?.changes_detected || 0 > 0 ? (
        <button
          onClick={() => {
            setCompetitorAnalysed(competitor);
            setPage(PageView.COMPETITORVIEW);
          }}
          type="submit"
          className="flex cursor-pointer justify-center space-x-5 rounded-full bg-[#705CF6] px-12 py-2 font-bold  text-white hover:brightness-90"
        >
          <Image
            src="/landscapeIcons/simpleGlass.svg"
            width={20}
            height={29}
            alt=""
            className="-ml-8 mt-[2px]"
          />
          <p>Analyse</p>
        </button>
      ) : (
        <button className=" cursor pointer flex justify-center rounded-full border-[3px] border-customRed px-[35px] py-2 text-sm font-bold text-customRed hover:brightness-90">
          Not Available
        </button>
      )}
    </div>
  );
};

export default AnalysisCard;
