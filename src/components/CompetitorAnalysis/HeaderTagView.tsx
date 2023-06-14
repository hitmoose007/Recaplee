import React, { useState } from 'react';

type Props = {
  tag: string;
};

const HeaderTagView = ({ tag }: Props) => {
  let color = '';
  if (tag === 'h1') {
    color = '#705CF6';
  }

  if (tag === 'h2') {
    color = '#7209B7';
  }
  if (tag === 'h3') {
    color = '#B5179E';
  }
  if (tag === 'h4') {
    color = '#013879';
  }
  if (tag === 'h5') {
    color = '#705CF6';
  }
  if (tag === 'h6') {
    color = '#009DF5';
  }
  if (tag === 'p') {
    color = '#4CC9F0';
  }

  return (
    <span
      style={{ backgroundColor: color }}
      className=" mr-4 inline-block   w-6 h-6 rounded-full pt-[2px] text-center text-sm   text-white "
    >
      {tag.toUpperCase()}
    </span>
  );
};
export default HeaderTagView;
