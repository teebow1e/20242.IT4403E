function Featured() {
    return (
        <>
            <h1 className="text-center text-5xl text-[#32462f]">The Spring edit</h1>

            {/* Box A */}
            <section className="my-5 grid grid-cols-2 bg-white text-white gap-10 items-center justify-between">
                <div className="bg-[#d2d2ae] text-center pb-10 max-w-[800px] mx-auto h-full">
                    <img className="max-w-full" src="/drink1.jpg" alt="" />
                    <h2 className="text-[28px] px-20 font-bold font-helvetica text-[#1e3932]">Iced Lavender Cream Oatmilk Matcha</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] px-20 text-[#1e3932]">A smooth combination of matcha green tea and oatmilk, finished with lavender cream cold foam with subtle floral notes. Includes dairy.</p>
                    <a href="#" className="inline-block px-4 py-2 border border-[#203a32] text-[#203a32] hover:bg-[#203a321b]">Order now</a>
                </div>

                <div className="bg-[#d2d2ae] text-center pb-10 max-w-[800px] mx-auto h-full">
                    <img className="max-w-full" src="/drink2.jpg" alt="" />
                    <h2 className="text-[28px] px-20 font-bold font-helvetica text-[#1e3932]">Iced Lavender Oatmilk Latte</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] px-20 text-[#1e3932]">Starbucks® Blonde Espresso and oatmilk combine with subtle floral accents, served over ice.</p>
                    <a href="#" className="inline-block px-4 py-2 border border-[#203a32] text-[#203a32] hover:bg-[#203a321b]">Order now</a>
                </div>
            </section>

            {/* Box B */}
            <section className="my-5 grid grid-cols-2 bg-[#32462f] text-white items-center justify-between">
                <img className="w-full h-full object-cover block" src="/drink3.jpg" alt="" />
                <div className="max-w-[600px] text-center justify-self-center p-10 mx-auto">
                    <h2 className="text-[28px]">New Iced Cherry Chai</h2>
                    <p className="my-[5px] leading-[1.7] text-[22px]">
                        A creamy cold foam with notes of cherry and a crunchy topping meets our signature chai tea latte for a spring take on a favorite.
                    </p>
                    <a href="#" className="inline-block px-4 py-2 border border-white text-white hover:bg-white/10 mt-5">Order now</a>
                </div>
            </section>

            {/* Box C */}
            <section className="my-5 grid grid-cols-2 bg-[#ffffffcb] text-white gap-10 items-center justify-between">
                <div className="bg-[#5f4633] text-center pb-10 max-w-[800px] mx-auto h-full">
                    <img className="max-w-full" src="/drink4.jpg" alt="" />
                    <h2 className="text-[28px] px-20 font-bold font-helvetica text-white">Cortado</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] px-20 text-white">Three ristretto shots of Starbucks® Blonde Espresso combined with steamed whole milk and served in an 8 fl oz short cup.</p>
                    <a href="#" className="inline-block px-4 py-2 border border-white text-white hover:bg-white/10">Order now</a>
                </div>

                <div className="bg-[#5f4633] text-center pb-10 max-w-[800px] mx-auto h-full">
                    <img className="max-w-full" src="/drink5.jpg" alt="" />
                    <h2 className="text-[28px] px-20 font-bold font-helvetica text-white">Brown Sugar Oatmilk Cortado</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] px-20 text-white">Three ristretto shots of Starbucks® Blonde Espresso, brown sugar syrup, cinnamon and steamed oatmilk in an 8 fl oz short cup.</p>
                    <a href="#" className="inline-block px-4 py-2 border border-white text-white hover:bg-white/10">Order now</a>
                </div>
            </section>

            {/* Box D */}
            <section className="my-5 grid grid-cols-2 bg-[#32462f] text-white items-center justify-between">
                <div className="order-2">
                    <img className="w-full h-full object-cover block" src="/drink6.jpg" alt="" />
                </div>
                <div className="max-w-[600px] text-center justify-self-center p-10 mx-auto order-1">
                    <h2 className="text-[28px]">Blackberry Sage Refreshers</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                        Sweet blackberry flavors and notes of sage are shaken with real blackberry pieces—enjoyed alone or with lemonade or coconutmilk.
                    </p>
                    <a href="#" className="inline-block px-4 py-2 border border-white text-white hover:bg-white/10 mt-5">See our seasonal refreshers</a>
                </div>
            </section>

            {/* Box E */}
            <section className="my-5 grid grid-cols-2 bg-[#006241] text-white items-center justify-between">
                <img className="w-full h-full object-cover block" src="/drink7.jpg" alt="" />
                <div className="max-w-[600px] text-center justify-self-center p-10 mx-auto">
                    <h2 className="text-[28px]">New Spicy Falafel Pocket and New Jalapeño Chicken Pocket</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                        Hand-folded, toasted lavash flatbreads with well-balanced, savory fillings like falafel and spicy herb sauce or chicken, peppers and jalapeño cream cheese.
                    </p>
                    <a href="#" className="inline-block px-4 py-2 border border-white text-white hover:bg-white/10 mt-5">Order now</a>
                </div>
            </section>
        </>
    );
}

export default Featured;
