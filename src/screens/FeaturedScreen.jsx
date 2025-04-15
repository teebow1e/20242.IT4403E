
import "./Box.css"
import "./FeaturedScreen.css"

function Featured() {
    return (
        <>
            <h1 className="title"> The Spring edit</h1>
            {/* <!-- Box A --> */}
            <section className="box featured-box-a bg-featured-box-a grid-col-2">
                <div className="box-inner featured-box-a-inner">
                    <img className="max-w-full" src="/drink1.jpg" alt="" />
                    <h2 className="text-[28px] text-drink-header-a">Iced Lavender Cream Oatmilk Matcha</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] text-drink-description-a" >A smooth combination of matcha green tea and oatmilk, finished with lavender cream cold foam with subtle floral notes. Includes dairy.</p>
                    <a href="#" className="btn btn-green-outline btn-order">Order now</a>
                </div>

                <div className="box-inner featured-box-a-inner">
                    <img className="max-w-full" src="/drink2.jpg" alt="" />
                    <h2 className="text-[28px] text-drink-header-a">Iced Lavender Oatmilk Latte</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] text-drink-description-a">Starbucks® Blonde Espresso and oatmilk combine with subtle floral accents, served over ice.</p>
                    <a href="#" className="btn btn-green-outline btn-order">Order now</a>
                </div>
            </section>

            {/* <!-- Box B --> */}
            <section className="box featured-box-b bg-featured-box-b grid-col-2">
                <img className="max-w-full" src="/drink3.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-[28px]">New Iced Cherry Chai</h2>
                    <p className="my-[5px] leading-[1.7] text-[22px]">
                    A creamy cold foam with notes of cherry and a crunchy topping meets our signature chai tea latte for a spring take on a favorite.
                    </p>
                    <a href="#" className="btn btn-light-outline btn-order">Order now</a>
                </div>
            </section>

            {/* <!-- Box C --> */}
            <section className="box featured-box-c bg-featured-box-c grid-col-2">
                <div className="box-inner featured-box-c-inner">
                    <img className="max-w-full" src="/drink4.jpg" alt="" />
                    <h2 className="text-[28px] text-drink-header-c">Cortado</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] text-drink-description-c" >Three ristretto shots of Starbucks® Blonde Espresso combined with steamed whole milk and served in an 8 fl oz short cup.</p>
                    <a href="#" className="btn btn-light-outline btn-order">Order now</a>
                </div>

                <div className="box-inner featured-box-c-inner">
                    <img className="max-w-full" src="/drink5.jpg" alt="" />
                    <h2 className="text-[28px] text-drink-header-c">Brown Sugar Oatmilk Cortado</h2>
                    <p className="my-[5px] leading-[1.7] text-[18px] text-drink-description-c">Three ristretto shots of Starbucks® Blonde Espresso, brown sugar syrup, cinnamon and steamed oatmilk in an 8 fl oz short cup.</p>
                    <a href="#" className="btn btn-light-outline btn-order">Order now</a>
                </div>
            </section>

            {/* <!-- Box D --> */}
            <section className="box featured-box-d bg-featured-box-d grid-col-2 grid-reversed">
                <img className="max-w-full" src="/drink6.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-[28px]">Blackberry Sage Refreshers</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                    Sweet blackberry flavors and notes of sage are shaken with real blackberry pieces—enjoyed alone or with lemonade or coconutmilk.
                    </p>
                    <a href="#" className="btn btn-light-outline">See our seasonal refreshers</a>
                </div>
            </section>

            {/* <!-- Box E --> */}
            <section className="box box-e bg-box-e grid-col-2">
                <img className="max-w-full" src="/drink7.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-[28px]">New Spicy Falafel Pocket and New Jalapeño Chicken Pocket</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                    Hand-folded, toasted lavash flatbreads with well-balanced, savory fillings like falafel and spicy herb sauce or chicken, peppers and jalapeño cream cheese.
                    </p>
                    <a href="#" className="btn btn-light-outline">Order now</a>
                </div>
            </section>

        </>
    )
}

export default Featured;
