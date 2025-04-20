import React from 'react';
import useIdleLogout from "../useIdleLogout";

import MenuHeader from "./menu/MenuHeader";
import MenuList from "./menu/MenuList";
// import MenuItem from "./menu/MenuItem";
// import menuList from "./menu/menuList.json";

function MenuScreen() {
  return (
    <div className="flex flex-col mb-[100px] max-md:mt-0 max-[425px]:mt-[30px]">
      <MenuHeader />
      <div className="flex gap-[100px] pl-[131px] mt-[101px] max-md:mt-[30px] max-[425px]:pl-[20px]">
        <div className="max-md:hidden">
          <MenuList />
        </div>
        
      </div>
    </div>
  );
}


export default MenuScreen;
