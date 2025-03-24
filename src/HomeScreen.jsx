import './HomeScreen.css'

function HomeScreen () {
    return (
        <>
            {/* <!-- Box A --> */}
            <section className="box box-a bg-primary text-center py-md">
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
            <section className="box box-b bg-secondary grid-col-2">
                <img src="/HomeScreen1.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-xl">New to the nice list</h2>
                    <p className="text-md">
                    For a nondairy twist on a holiday cookie classic, try the new Iced Sugar Cookie Almondmilk Latte.
                    </p>
                    <a href="#" className="btn btn-light-outline">Order Now</a>
                </div>
            </section>

            {/* <!-- Box C --> */}
            <section className="box box-c bg-secondary grid-col-2 grid-reversed">
                <img src="/HomeScreen1.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-xl">The Spring Edit</h2>
                    <p className="text-md">
                    Fresh flavors, familiar joy.
                    </p>
                    <a href="#" className="btn btn-light-outline">Order Now</a>
                </div>
            </section>

            {/* <!-- Box D --> */}
            <section className="box box-d bg-primary grid-col-2">
                <img src="/HomeScreen3.jpg" alt="" />
                <div className="box-text">
                    <h2 className="text-xl">It’s a great day for free coffee</h2>
                    <p className="text-md">
                    Start your Starbucks® Rewards journey with a coffee on us. Join now and enjoy a free handcrafted drink with a qualifying purchase during your first week.
                    </p>
                    <a href="#" className="btn btn-light-outline">Order Now</a>
                </div>
            </section>
        </>
    )
}

export default HomeScreen