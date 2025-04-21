import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function MenuHeader() {
  const [index, setIndex] = useState(0)
  const linkBase = 'text-[13px] font-semibold text-black/90 pb-[5px]'

  return (
    <div className="bg-[#f7f7f7] border border-[#dedede] border-b border-[#dedede] w-full pl-[131px] pt-[15px] pb-[10px] z-[2] block max-[425px]:hidden">
      <div className="flex gap-[25px]">
        <Link
          onClick={() => setIndex(0)}
          className={`${linkBase} ${index === 0 ? 'border-b border-black' : ''}`}
        >
          All products
        </Link>
        <Link
          to="/menu/featured"
          onClick={() => setIndex(1)}
          className={`${linkBase} ${index === 1 ? 'border-b border-black' : ''}`}
        >
          Featured
        </Link>
        <Link
          onClick={() => setIndex(2)}
          className={`${linkBase} ${index === 2 ? 'border-b border-black' : ''}`}
        >
          Previous Orders
        </Link>
        <Link
          onClick={() => setIndex(3)}
          className={`${linkBase} ${index === 3 ? 'border-b border-black' : ''}`}
        >
          Favorite Products
        </Link>
      </div>
    </div>
  )
}

export default MenuHeader
