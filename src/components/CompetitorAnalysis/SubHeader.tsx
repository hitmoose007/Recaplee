import React from 'react'

type Props = {
    title: string
}

const subHeader = ({title}: Props) => {
  return (
    <div className="text-[#334DD9] text-[20px] font-bold">{title}</div>
  )
}

export default subHeader