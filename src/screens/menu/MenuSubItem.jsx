import React from 'react';
import { Link } from 'react-router-dom';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import AddToCartButton from '../../components/AddToCartButton';

export default function SectionedMenu({
  data,
  sections,
  linkPrefix = '',
}) {
  return (
    <div className="flex flex-col mt-8 sm:mt-0">
      <MenuHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* sidebar */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5 xl:w-1/6">
            <MenuList />
          </aside>

          {/* main content */}
          <main className="flex-1">
            {sections.map(({ key, title, clickable }) => {
              const items = data[key];
              if (!items) return null;

              return (
                <section key={key} className="mb-16">
                  <h2 className="text-2xl sm:text-[28px] font-extrabold text-black/90 mb-5">
                    {title}
                  </h2>

                  {/* Grid container */}
                  <div
                    className="
                      border-t border-black/10 pt-6
                      grid
                      grid-cols-1        /* phones: 1‑up */
                      sm:grid-cols-2     /* ≥640 px: 2‑up */
                      md:grid-cols-3     /* ≥768 px: 3‑up */
                      lg:grid-cols-4     /* ≥1024 px: 4‑up */
                      gap-x-6 gap-y-10
                    "
                  >
                    {items.map((item, idx) => {
                      const Container = clickable ? Link : 'div';
                      const toProps = clickable
                        ? { to: linkPrefix + (item.path || '') }
                        : {};

                      return (
                        <Container
                          key={`${key}-${idx}`}
                          {...toProps}
                          className="
                            group
                            flex flex-col justify-between items-center
                            text-center
                            cursor-pointer hover:opacity-90
                            transition-transform duration-300
                            h-full
                            px-4
                          "
                        >
                          {/* image */}
                          <div className="relative mb-3 overflow-hidden rounded-full">
                            <img
                              src={item.image}
                              alt={item.type}
                              className="
                                rounded-full object-cover
                                w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                                transition-transform duration-500
                                group-hover:scale-105
                              "
                            />
                          </div>

                          {/* label */}
                          <h4 className="
                            font-semibold text-[16px] md:text-[18px] leading-[1.4] text-black/90
                            transition-colors duration-300
                            group-hover:text-[#006241]
                            mb-4
                          ">
                            {item.type}
                          </h4>

                          {/* button pinned to bottom by flex‑column + justify‑between */}
                          <AddToCartButton item={item} category={key} />
                        </Container>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>
    </div>
  );
}
