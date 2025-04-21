import React from 'react'
import MenuHeader from '../MenuHeader'
import MenuList from '../MenuList'
import hotCoffeeData from './hotCoffee.json'

function HotCoffee() {
  const { brewedCoffee, americano } = hotCoffeeData[0]  // load your arrays :contentReference[oaicite:0]{index=0}

  return (
    <div className="flex flex-col mt-[30px] sm:mt-0">
      <MenuHeader />
      <div className="flex gap-[100px] pl-[20px] mt-[30px] sm:pl-[130px] sm:mt-[40px]">
        <div className="hidden md:block">
          <MenuList />
        </div>
        <div className="flex-1">
          {/* Brewed Coffee Section */}
          <section className="mb-[60px]">
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-black/90 mb-[20px]">
              Brewed Coffee
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {brewedCoffee.map(({ type, image }, idx) => (
                <div
                  key={`brewed-${idx}`}
                  className="flex flex-col items-center text-center gap-[10px] w-[240px] md:w-[260px]"
                >
                  <img
                    src={image}
                    alt={type}
                    className="rounded-full object-contain w-[80px] md:w-[120px]"
                  />
                  <h4 className="text-[16px] md:text-[18px] leading-[1.5] font-semibold text-black/90">
                    {type}
                  </h4>
                </div>
              ))}
            </div>
          </section>

          {/* Americano Section */}
          <section className="mb-[60px]">
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-black/90 mb-[20px]">
              Americano
            </h2>
            <div className="border-t border-black/10 flex flex-wrap gap-x-[100px] gap-y-[40px] pt-[20px] pr-[20px]">
              {americano.map(({ type, image }, idx) => (
                <div
                  key={`americano-${idx}`}
                  className="flex items-center gap-[10px] w-[240px] md:w-[260px]"
                >
                  <img
                    src={image}
                    alt={type}
                    className="rounded-full object-contain w-[80px] md:w-[120px]"
                  />
                  <h4 className="text-[16px] md:text-[18px] leading-[1.5] font-semibold text-black/90">
                    {type}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HotCoffee
