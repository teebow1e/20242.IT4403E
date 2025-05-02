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
        <div className="flex flex-col">
            <MenuHeader />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row">
                    {/* Updated sidebar with consistent width classes */}
                    <aside className="hidden md:block md:w-1/4 lg:w-1/5 xl:w-1/6">
                        <MenuList />
                    </aside>
                    {/* Updated content area with consistent width classes */}
                    <main className="md:w-3/4 lg:w-4/5 xl:w-5/6 md:pl-8">
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
                    </main>
                </div>
            </div>
        </div>
    )
}
