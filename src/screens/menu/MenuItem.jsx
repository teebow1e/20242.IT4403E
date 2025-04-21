import React from 'react'
import { Link } from 'react-router-dom'

function MenuItem({ type, image }) {
  return (
    <Link className="flex items-center gap-[10px] w-[240px] md:w-[260px]">
      <img
        src={image}
        alt={type}
        className="rounded-full object-contain w-[80px] md:w-[120px]"
      />
      <h4 className="text-[16px] md:text-[18px] leading-[1.5] font-semibold text-black/90">
        {type}
      </h4>
    </Link>
  )
}

export default MenuItem
