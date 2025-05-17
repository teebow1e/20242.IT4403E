function HomeScreen() {
    return (
      <>
        {/* Box A */}
        <section className="max-w-[1440px] mx-auto px-4 my-5 bg-[#006241] text-white text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-sodo font-bold text-[40px]">
              Jingle all the way to free favorites
            </h2>
            <p className="font-sodo my-1 text-[24px] leading-[1.7]">
              Join Starbucks ® Rewards for delicious deals & exclusive offers.
              <br />
              <a href="#" className=" text-white hover:underline">
                Learn more
              </a>
            </p>
          </div>
        </section>

        {/* Box B */}
        <section className="max-w-[1440px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#32462f] text-white">
          <img
            className="w-full h-full object-cover"
            src="/HomeScreen1.jpg"
            alt="Spring beverages"
          />
          <div className="mx-auto max-w-[600px] p-10 text-center">
            <h2 className="font-sodo font-bold text-[40px]">The Spring Edit</h2>
            <p className="my-1 text-[28px] leading-[1.7]">Fresh flavors, familiar joy.</p>
            <a
              href="#"
              className="inline-block rounded-full border border-white px-4 py-2 mt-5 text-center hover:opacity-80"
            >
              View the menu
            </a>
          </div>

        </section>

        {/* Box C */}
        <section className="max-w-[1440px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#440010cb] text-white">
          <img
            className="w-full md:order-2"
            src="/HomeScreen3.jpg"
            alt="Sunsera Blend"
          />
          <div className="mx-auto max-w-[600px] p-10 text-center">
            <h2 className="font-sodo font-bold text-[36px]">
              Our smoothest, brightest coffee yet
            </h2>
            <p className="my-1 text-[24px] leading-[1.7]">
              Discover the people and places behind the new Starbucks® Sunsera Blend™ as it makes its way from farm to cup.
            </p>
            <a
              href="#"
              className="inline-block rounded-full border border-white px-4 py-2 mt-5 text-center hover:opacity-80"
            >
              See the journey
            </a>
          </div>
        </section>

        {/* Box D */}
        <section className="max-w-[1440px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#5f4633] text-white">
          <img
            className="w-full"
            src="/HomeScreen2.jpg"
            alt="Free coffee"
          />
          <div className="mx-auto max-w-[600px] p-10 text-center">
            <h2 className="font-sodo font-bold text-[32px]">
              It’s a great day for free coffee
            </h2>
            <p className="my-1 text-[24px] leading-[1.7]">
              Start your Starbucks® Rewards journey with a coffee on us. Join now and enjoy a free handcrafted drink with a qualifying purchase during your first week.*
            </p>
            <a
              href="#"
              className="inline-block rounded-full border border-white px-4 py-2 mt-5 text-center hover:opacity-80"
            >
              Order Now
            </a>
          </div>
        </section>

        {/* Box E */}
        <section className="max-w-[1440px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#006241] text-white">
          <img
            className="w-full md:order-2"
            src="/HomeScreen5.jpg"
            alt="Mugs & glasses"
          />
          <div className="mx-auto max-w-[600px] p-10 text-center">
            <h2 className="font-sodo font-bold text-[36px]">
              More reasons to stay awhile
            </h2>
            <p className="my-1 text-[24px] leading-[1.7]">
              Mugs, glasses and the condiment bar are back—and get free refills of hot or iced brewed coffee or tea.**
            </p>
            <a
              href="#"
              className="inline-block rounded-full border border-white px-4 py-2 mt-5 text-center hover:opacity-80"
            >
              Learn More
            </a>
          </div>
        </section>
      </>
    );
  }

export default HomeScreen;
