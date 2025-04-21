import React from 'react'
import MenuHeader from './menu/MenuHeader'
import MenuList from './menu/MenuList'
import MenuItem from './menu/MenuItem'
import menuList from './menu/menulist.json'

function MenuScreen() {
  const { drinks, food, atHomeCoffee, merchandise } = menuList[0]

  return (
    <div className="flex flex-col mt-[30px] sm:mt-0">
      <MenuHeader />
      <div className="flex gap-[100px] pl-[20px] mt-[30px] sm:pl-[130px] sm:mt-[40px]">
        <div className="hidden md:block">
          <MenuList />
        </div>
        <div className="flex-1">
          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-black/90 mb-[40px]">
            Menu
          </h1>

          {/* Drinks */}
          <section className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              Drinks
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {drinks.map(({ path, type, image }, idx) => (
                <MenuItem
                  key={`drink-${idx}`}
                  path={path}
                  type={type}
                  image={image}
                />
              ))}
            </div>
          </section>

          {/* Food */}
          <section className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              Food
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {food.map(({ path, type, image }, idx) => (
                <MenuItem
                  key={`food-${idx}`}
                  path={path}
                  type={type}
                  image={image}
                />
              ))}
            </div>
          </section>

          {/* At Home Coffee */}
          <section className="mb-[60px]">
            <h2 className="text-[19px] sm:text-[24px] font-extrabold text-black/90 mb-[20px]">
              At Home Coffee
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {atHomeCoffee.map(({ path, type, image }, idx) => (
                <MenuItem
                  key={`coffee-${idx}`}
                  path={path}
                  type={type}
                  image={image}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen
