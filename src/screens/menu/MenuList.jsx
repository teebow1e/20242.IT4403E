import React from 'react';
import { Link } from 'react-router-dom';
import menuList from './menuList.json';

function MenuList() {
  return (
    <div className="flex flex-col gap-[30px]">
      <div>
        <h4 className="text-[18px] text-black/90 mb-[20px]">Drinks</h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((menuListCategory, i) =>
            menuListCategory.drinks.map((menuListItem, j) => (
              <Link
                key={`drinks-${i}-${j}`}
                className="text-black/60 text-[15px] font-semibold max-w-[150px] leading-[1.5]"
              >
                {menuListItem.type}
              </Link>
            ))
          )}
        </div>
      </div>

      <div>
        <h4 className="text-[18px] text-black/90 mb-[20px]">Food</h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((menuListCategory, i) =>
            menuListCategory.food.map((menuListItem, j) => (
              <Link
                key={`food-${i}-${j}`}
                className="text-black/60 text-[15px] font-semibold max-w-[150px] leading-[1.5]"
              >
                {menuListItem.type}
              </Link>
            ))
          )}
        </div>
      </div>

      <div>
        <h4 className="text-[18px] text-black/90 mb-[20px]">At Home Coffee</h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((menuListCategory, i) =>
            menuListCategory.atHomeCoffee.map((menuListItem, j) => (
              <Link
                key={`coffee-${i}-${j}`}
                className="text-black/60 text-[15px] font-semibold max-w-[150px] leading-[1.5]"
              >
                {menuListItem.type}
              </Link>
            ))
          )}
        </div>
      </div>

      <div>
        <h4 className="text-[18px] text-black/90 mb-[20px]">Merchandise</h4>
        <div className="flex flex-col gap-[12px]">
          {menuList.map((menuListCategory, i) =>
            menuListCategory.merchandise.map((menuListItem, j) => (
              <Link
                key={`merch-${i}-${j}`}
                className="text-black/60 text-[15px] font-semibold max-w-[150px] leading-[1.5]"
              >
                {menuListItem.type}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuList;
