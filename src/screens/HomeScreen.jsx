import './HomeScreen.css'

function HomeScreen () {
    return (
        <>
            {/* <!-- Box A --> */}
            <section className="box box-a bg-box-a text-center py-md">
                <div className="box-inner">
                    <h2 className="text-xl">Jingle all the way to free favorites</h2>
                    <p className="text-md">
                    Join Starbucks ® Rewards for delicious deals & exclusive offers.
                    <br></br>
                    <a href="#">Learn more</a>
                    </p>
                </div>
            </section>

            {/* <!-- Box B --> */}
            <section className="box box-b bg-box-b grid-col-2">
                <img src="/HomeScreen1.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-xl">The Spring Edit</h2>
                    <p className="text-md">
                    Fresh flavors, familiar joy.
                    </p>
                    <a href="#" className="btn btn-light-outline">View the menu</a>
                </div>
            </section>

            {/* <!-- Box C --> */}
            <section className="box box-c bg-box-c grid-col-2 grid-reversed">
                <img src="/HomeScreen3.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-xl">Our smoothest, brightest coffee yet</h2>
                    <p className="text-sm">
                    Discover the people and places behind the new Starbucks® Sunsera Blend™ as it makes its way from farm to cup.
                    </p>
                    <a href="#" className="btn btn-light-outline">See the journey</a>
                </div>
            </section>

            {/* <!-- Box D --> */}
            <section className="box box-d bg-box-d grid-col-2">
                <img src="/HomeScreen2.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-lg">It’s a great day for free coffee</h2>
                    <p className="text-sm">
                    Start your Starbucks® Rewards journey with a coffee on us. Join now and enjoy a free handcrafted drink with a qualifying purchase during your first week.*
                    </p>
                    <a href="#" className="btn btn-light-outline">Order Now</a>
                </div>
            </section>

            {/* <!-- Box E --> */}
            <section className="box box-e bg-box-e grid-col-2 grid-reversed">
                <img src="/HomeScreen5.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-xl">More reasons to stay awhile</h2>
                    <p className="text-sm">
                    Mugs, glasses and the condiment bar are back—and get free refills of hot or iced brewed coffee or tea.**
                    </p>
                    <a href="#" className="btn btn-light-outline">Learn More</a>
                </div>
            </section>


            {/* <!-- Section E --> */}
            <section className="box">
                <div className="box-text">
                    <p className="text-esm">
                    *Valid for new Starbucks Rewards members for 7 days from sign up. Coupon will be available in the offers tab of your Starbucks app following sign up and may take up to 48 hours to arrive. Good at participating U.S. stores for a handcrafted menu-sized beverage with qualifying purchase ($8 max value). Qualifying purchase excludes alcohol, Starbucks Card and Card reloads. Limit one. Cannot be combined with other offers or discounts. Excludes delivery services. Sign up before 3/30/2025.
                    </p>
                    <br></br>
                    <p className="text-esm">
                    **Free refills of hot and iced brewed coffee or tea during same store visit. Excludes Cold Brew, Nitro Cold Brew, Iced Tea Lemonade, and flavored Iced Tea and Starbucks Refreshers® base. At participating stores. Want a free starbuck ? Ask FieryPhoenix !
                    </p>
                </div>
            </section>

        </>
    )
}

export default HomeScreen