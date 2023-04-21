import React from 'react'
import Image from 'next/image'
type Props = {}

const SaveButton = (props: Props) => {
  return (
    <button className="bg-[#61CE70] flex text-white text-sm md:px-4  md:space-x-2 rounded-full md:p-2 hover:brightness-90">
        <Image src="/saveIcon.svg" width={20} height={20} alt="save icon" />
        <span> Save and Proceed</span></button>
  )
}

export default SaveButton