import React from "react";
import MenuHeader from "./menu/MenuHeader";
import MenuList from "./menu/MenuList";
import MenuItem from "./menu/MenuItem";
import menuList from "./menu/menulist.json";

function MenuScreen() {
  return (
    <div className="flex flex-col mt-[30px] sm:mt-0">
      <MenuHeader />
      <div className="flex gap-[100px] pl-[20px] mt-[30px] sm:pl-[131px] sm:mt-[101px]">
        <div className="hidden md:block">
          <MenuList />
        </div>
        <div className="flex-1">
          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-black/90 mb-[40px]">
            Menu
          </h1>

          {/* Drinks */}
          <div className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              Drinks
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {menuList[0].drinks.map(({ type, image }, idx) => (
                <MenuItem key={`drink-${idx}`} type={type} image={image} />
              ))}
            </div>
          </div>

          {/* Food */}
          <div className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              Food
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {menuList[0].food.map(({ type, image }, idx) => (
                <MenuItem key={`food-${idx}`} type={type} image={image} />
              ))}
            </div>
          </div>

          {/* At Home Coffee */}
          <div className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              At Home Coffee
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {menuList[0].atHomeCoffee.map(({ type, image }, idx) => (
                <MenuItem key={`coffee-${idx}`} type={type} image={image} />
              ))}
            </div>
          </div>

          {/* Merchandise */}
          <div className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              Merchandise
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {menuList[0].merchandise.map(({ type, image }, idx) => (
                <MenuItem key={`merch-${idx}`} type={type} image={image} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuScreen;
