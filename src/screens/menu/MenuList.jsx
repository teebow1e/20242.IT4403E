import React from 'react'
import { Link } from 'react-router-dom'
import menuList from './menuList.json'

function MenuList() {
  const { drinks, food, atHomeCoffee, merchandise } = menuList[0]

  return (
    <div className="flex flex-col gap-[30px]">
      {/* Drinks */}
      <div className="flex flex-col">
        <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
          Drinks
        </h4>
        <div className="flex flex-col gap-[12px]">
          {drinks.map(({ path, type }, idx) => (
            <Link
              key={`drinks-${idx}`}
              to={`/menu${path}`}
              className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
            >
              {type}
            </Link>
          ))}
        </div>
      </div>

      {/* Food */}
      <div className="flex flex-col">
        <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
          Food
        </h4>
        <div className="flex flex-col gap-[12px]">
          {food.map(({ path, type }, idx) => (
            <Link
              key={`food-${idx}`}
              to={`/menu${path}`}
              className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
            >
              {type}
            </Link>
          ))}
        </div>
      </div>

      {/* At Home Coffee */}
      <div className="flex flex-col">
        <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
          At Home Coffee
        </h4>
        <div className="flex flex-col gap-[12px]">
          {atHomeCoffee.map(({ path, type }, idx) => (
            <Link
              key={`coffee-${idx}`}
              to={`/menu${path}`}
              className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
            >
              {type}
            </Link>
          ))}
        </div>
      </div>

      {/* Merchandise (if any) */}
      {merchandise && (
        <div className="flex flex-col">
          <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
            Merchandise
          </h4>
          <div className="flex flex-col gap-[12px]">
            {merchandise.map(({ path, type }, idx) => (
              <Link
                key={`merch-${idx}`}
                to={`/menu${path}`}
                className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuList
