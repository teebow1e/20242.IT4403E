import React from 'react'
import { Link } from 'react-router-dom'
import MenuHeader from './MenuHeader'
import MenuList from './MenuList'
import AddToCartButton from '../../components/AddToCartButton'

export default function SectionedMenu({
  data,            // e.g. hotCoffeeData[0]
  sections,        // e.g. [{ key:'brewedCoffee',title:'Brewed Coffee', clickable:false }, ...]
  linkPrefix = ''  // e.g. '/menu'
}) {
  return (
    <div className="flex flex-col mt-[30px] sm:mt-0">
      <MenuHeader />
      <div className="flex gap-[100px] pl-[20px] mt-[50px] mb-[50px] sm:pl-[130px] sm:mt-[40px]">
        <div className="hidden md:block">
          <MenuList />
        </div>
        <div className="flex-1">
          {sections.map(({ key, title, clickable }) => {
            const items = data[key]
            if (!items) return null

            return (
              <section key={key} className="mb-[60px]">
                <h2 className="text-[24px] sm:text-[28px] font-extrabold text-black/90 mb-[20px]">
                  {title}
                </h2>
                <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
                  {items.map((item, idx) => {
                    const Container = clickable ? Link : 'div'
                    const toProps = clickable
                      ? { to: linkPrefix + (item.path || '') }
                      : {}

                    return (
                      <Container
                        key={`${key}-${idx}`}
                        {...toProps}
                        className="flex flex-col items-center text-center gap-[10px] w-[240px] md:w-[260px]"
                      >
                        <img
                          src={item.image}
                          alt={item.type}
                          className="rounded-full object-contain w-[80px] md:w-[120px]"
                        />
                        <h4 className="text-[16px] md:text-[18px] leading-[1.5] font-semibold text-black/90">
                          {item.type}
                        </h4>
                        <AddToCartButton item={item} category={key} />
                      </Container>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
