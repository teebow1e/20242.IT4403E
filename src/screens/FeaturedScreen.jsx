import React from 'react';

function Featured() {
  return (
    <>
      {/* Page Title */}
      <section className="max-w-[1080px] mx-auto px-5 my-5 text-center items-stretch">
        <h1 className="font-sodo font-bold text-[40px] text-[#32462f]">
          The Spring Edit
        </h1>
      </section>

      {/* Box A */}
      <section className="max-w-[1080px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
        {[{
          img: '/drink1.jpg',
          title: 'Iced Lavender Cream Oatmilk Matcha',
          desc: 'A smooth combination of matcha green tea and oatmilk, finished with lavender cream cold foam with subtle floral notes. Includes dairy.',
        }, {
          img: '/drink2.jpg',
          title: 'Iced Lavender Oatmilk Latte',
          desc: 'Meowbucks® Blonde Espresso and oatmilk combine with subtle floral accents, served over ice.',
        }].map((item, i) => (
          <div
            key={i}
            className="flex flex-col mx-auto max-w-[800px] text-center bg-[#d2d2ae] text-[#1e3932] justify-between h-full"
          >
            <img
              className="w-full h-auto object-cover mb-4"
              src={item.img}
              alt={item.title}
            />
            <h2 className="font-sodo font-bold text-[24px] mb-3">
              {item.title}
            </h2>
            <p className="my-1 leading-[1.6] text-[16px] mb-5 px-10">
              {item.desc}
            </p>
            <a
              href="#"
              className="inline-block rounded-full mt-5 mb-5 border border-[#203a32] px-4 py-1.5 text-[14px] text-[#203a32] hover:opacity-80 self-center "
            >
              Order now
            </a>
          </div>
        ))}
      </section>


      {/* Box B */}
      <section className="max-w-[1080px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#32462f] text-white">
        <img
          className="w-full h-full object-cover"
          src="/drink3.jpg"
          alt="New Iced Cherry Chai"
        />
        <div className="mx-auto max-w-[600px] p-10 text-center">
          <h2 className="font-sodo font-bold text-[28px]">
            New Iced Cherry Chai
          </h2>
          <p className="my-1 leading-[1.7] text-[20px] mb-6">
            A creamy cold foam with notes of cherry and a crunchy topping meets our signature chai tea latte for a spring take on a favorite.
          </p>
          <a
            href="#"
            className="inline-block rounded-full border border-white px-4 py-2 mt-5 hover:opacity-80"
          >
            Order now
          </a>
        </div>
      </section>

      {/* Box C */}
      <section className="max-w-[1080px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        {[{
          img: '/drink4.jpg',
          title: 'Cortado',
          desc: 'Three ristretto shots of Meowbucks® Blonde Espresso combined with steamed whole milk and served in an 8 fl oz short cup.',
        }, {
          img: '/drink5.jpg',
          title: 'Brown Sugar Oatmilk Cortado',
          desc: 'Three ristretto shots of Meowbucks® Blonde Espresso, brown sugar syrup, cinnamon and steamed oatmilk in an 8 fl oz short cup.',
        }].map((item, i) => (
          <div key={i} className="flex flex-col mx-auto max-w-[800px] text-center bg-[#5f4633] text-[#ffffff] justify-between h-full">
            <img className="w-full h-auto object-cover mb-6" src={item.img} alt={item.title} />
            <h2 className="font-sodo font-bold text-[28px] mb-4">
              {item.title}
            </h2>
            <p className="my-1 leading-[1.7] text-[18px] mb-6 px-10">
              {item.desc}
            </p>
            <a
              href="#"
              className="inline-block rounded-full mt-5 mb-5 border border-[#ffffff] px-4 py-1.5 text-[14px] text-[#ffffff] hover:opacity-80 self-center"
            >
              Order now
            </a>
          </div>
        ))}
      </section>

      {/* Box D */}
      <section className="max-w-[1080px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#32462f] text-white">
        <img
          className="w-full h-full object-cover order-2 md:order-2"
          src="/drink6.jpg"
          alt="Blackberry Sage Refreshers"
        />
        <div className="mx-auto max-w-[600px] p-10 text-center order-1 md:order-1">
          <h2 className="font-sodo font-bold text-[28px]">
            Blackberry Sage Refreshers
          </h2>
          <p className="my-1 leading-[1.7] text-[20px] mb-6">
            Sweet blackberry flavors and notes of sage are shaken with real blackberry pieces—enjoyed alone or with lemonade or coconutmilk.
          </p>
          <a
            href="#"
            className="inline-block rounded-full border border-white px-4 py-2 mt-5 hover:opacity-80"
          >
            See our seasonal refreshers
          </a>
        </div>
      </section>

      {/* Box E */}
      <section className="max-w-[1080px] mx-auto my-5 grid grid-cols-1 md:grid-cols-2 items-center bg-[#006241] text-white">
        <img
          className="w-full h-full object-cover"
          src="/drink7.jpg"
          alt="Falafel & Chicken Pockets"
        />
        <div className="mx-auto max-w-[600px] p-10 text-center">
          <h2 className="font-sodo font-bold text-[28px]">
            New Spicy Falafel Pocket and New Jalapeño Chicken Pocket
          </h2>
          <p className="my-1 leading-[1.7] text-[20px] mb-6">
            Hand-folded, toasted lavash flatbreads with well-balanced, savory fillings like falafel and spicy herb sauce or chicken, peppers and jalapeño cream cheese.
          </p>
          <a
            href="#"
            className="inline-block rounded-full border border-white px-4 py-2 mt-5 hover:opacity-80"
          >
            Order now
          </a>
        </div>
      </section>
    </>
  );
}

export default Featured;
