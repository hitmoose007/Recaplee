import { Competitor, CurrentContent, QuerySummary } from '@/types/my-types';
import React from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import countWords from 'words-count';

type Props = {
  competitorAnalysed: Competitor;
  querySummary: QuerySummary;
  removedCopyAllText: string;
    addedCopyAllText: string;
};

const ExpandedBanner = ({ competitorAnalysed, querySummary,addedCopyAllText,removedCopyAllText }: Props) => {

    const old_update = new Date(querySummary.old_update).toLocaleDateString();
    const recent_update = new Date(querySummary.recent_update).toLocaleDateString();
  return (
    <>
      <div className="md:flex space-x-20 ">
        <div className="md:flex w-1/2 justify-between text-customGray hidden">
          <p>Analysis page date: <span className='font-bold'>{old_update}</span></p>
          <p>
            The content had  {' '}
            <span className="font-bold">
            {competitorAnalysed.old_content ?
              (JSON.stringify(competitorAnalysed.old_content).split(' ').length): 0 }{' '}</span>words
          </p>
        </div>
        <div className="flex w-1/2 justify-between text-customGray">
          <p>Analysis page date: <span className='font-bold'>{recent_update}</span></p>
          <p className="md:block hidden">
            The content had  {' '} 
            <span className="font-bold  ">
            {competitorAnalysed.current_content ?
              JSON.stringify(competitorAnalysed.current_content).split(' ').length: 0}{' '} </span>words
          </p>
        </div>
      </div>
      <div className="hidden md:flex space-x-20">
      <div
        className="flex w-1/2 space-x-2 text-customGray hover:cursor-pointer "
        onClick={() => {
          navigator.clipboard.writeText(
            removedCopyAllText || ''
          );
        }}
      >
        {' '}
        <span>Click to Copy All</span>
        <IoCopyOutline size={20} color="gray" />
      </div>
      <div
        className="flex w-1/2  space-x-2 text-customGray hover:cursor-pointer "
        onClick={() => {
          navigator.clipboard.writeText(
            addedCopyAllText || ''
          );
        }}
      >
        {' '}
        <span>Click to Copy All</span>
        <IoCopyOutline size={20} color="gray" />
      </div>
      </div>
    </>
  );
};


export default ExpandedBanner;
