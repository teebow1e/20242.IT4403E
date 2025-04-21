import React from 'react'
import { Link } from 'react-router-dom'
import menuList from './menulist.json'

function MenuList() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Drinks */}
      <div className="flex flex-col">
        <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
          Drinks
        </h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((category) =>
            category.drinks.map((item, idx) => (
              <Link
                key={`drinks-${idx}`}
                to={item.path}
                className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
              >
                {item.type}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Food */}
      <div className="flex flex-col">
        <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
          Food
        </h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((category) =>
            category.food.map((item, idx) => (
              <Link
                key={`food-${idx}`}
                to={item.path}
                className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
              >
                {item.type}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* At Home Coffee */}
      <div className="flex flex-col">
        <h4 className="text-[18px] font-semibold text-black/90 mb-[20px]">
          At Home Coffee
        </h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((category) =>
            category.atHomeCoffee.map((item, idx) => (
              <Link
                key={`coffee-${idx}`}
                to={item.path}
                className="text-[15px] font-semibold leading-[1.5] text-black/60 max-w-[150px]"
              >
                {item.type}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuList
