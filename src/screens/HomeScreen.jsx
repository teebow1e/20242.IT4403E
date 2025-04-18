import "./Box.css"
import './HomeScreen.css'

function HomeScreen () {
    return (
        <>
            {/* <!-- Box A --> */}
            <section className="box mb-[20px] mt-[20px] bg-[#006241] text-[white] text-center">
                <div className="max-w-[800px] mx-auto h-full">
                    <h2 className="text-[40px]">Jingle all the way to free favorites</h2>
                    <p className="my-[5px] leading-[1.7] text-[28px]">
                    Join Starbucks ® Rewards for delicious deals & exclusive offers.
                    <br></br>
                    <a href="#" className="text-black hover:underline">Learn more</a>
                    </p>
                </div>
            </section>

            {/* <!-- Box B --> */}
            <section className="box my-[20px] bg-[#32462f] text-[white] grid grid-cols-2 items-center justify-between">
                <img className="w-full h-full object-cover block" src="/HomeScreen1.jpg" alt="" />
                <div className="max-w-[600px] text-center justify-self-center p-[40px] mx-auto">
                    <h2 className="text-[40px]">The Spring Edit</h2>
                    <p className="my-[5px] leading-[1.7] text-[28px]">
                    Fresh flavors, familiar joy.
                    </p>
                    <a href="#" className="inline-block cursor-pointer border border-white text-white rounded-full px-[16px] py-[7px] leading-[1.2] text-center mt-[20px] hover:underline">View the menu</a>
                </div>
            </section>

            {/* <!-- Box C --> */}
            <section className="box mb-5 mt-5 bg-[#440010cb] text-[white] grid grid-cols-2 order-2">
                <img className="max-w-full" src="/HomeScreen3.jpg" alt="" />
                <div className="max-w-[600px] text-center justify-self-center p-[40px] mx-auto">
                    <h2 className="text-[40px]">Our smoothest, brightest coffee yet</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                    Discover the people and places behind the new Starbucks® Sunsera Blend™ as it makes its way from farm to cup.
                    </p>
                    <a href="#" className="text-white hover:underline btn btn-light-outline">See the journey</a>
                </div>
            </section>

            {/* <!-- Box D --> */}
            <section className="box box-d bg-box-d grid-col-2">
                <img className="max-w-full" src="/HomeScreen2.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-[32px]">It’s a great day for free coffee</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                    Start your Starbucks® Rewards journey with a coffee on us. Join now and enjoy a free handcrafted drink with a qualifying purchase during your first week.*
                    </p>
                    <a href="#" className="text-white hover:underline btn btn-light-outline">Order Now</a>
                </div>
            </section>

            {/* <!-- Box E --> */}
            <section className="box box-e bg-box-e grid-col-2 grid-reversed">
                <img className="max-w-full" src="/HomeScreen5.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-[40px]">More reasons to stay awhile</h2>
                    <p className="my-[5px] leading-[1.7] text-[24px]">
                    Mugs, glasses and the condiment bar are back—and get free refills of hot or iced brewed coffee or tea.**
                    </p>
                    <a href="#" className="text-white hover:underline btn btn-light-outline">Learn More</a>
                </div>
            </section>


            {/* <!-- Section E --> */}
            <section className="box">
                <div className="box-text">
                    <p className="my-[5px] leading-[1.7] text-[16px]">
                    *Valid for new Starbucks Rewards members for 7 days from sign up. Coupon will be available in the offers tab of your Starbucks app following sign up and may take up to 48 hours to arrive. Good at participating U.S. stores for a handcrafted menu-sized beverage with qualifying purchase ($8 max value). Qualifying purchase excludes alcohol, Starbucks Card and Card reloads. Limit one. Cannot be combined with other offers or discounts. Excludes delivery services. Sign up before 3/30/2025.
                    </p>
                    <br></br>
                    <p className="my-[5px] leading-[1.7] text-[16px]">
                    **Free refills of hot and iced brewed coffee or tea during same store visit. Excludes Cold Brew, Nitro Cold Brew, Iced Tea Lemonade, and flavored Iced Tea and Starbucks Refreshers® base. At participating stores. Want a free starbuck ? Ask FieryPhoenix !
                    </p>
                </div>
            </section>

        </>
    )
}

export default HomeScreen
