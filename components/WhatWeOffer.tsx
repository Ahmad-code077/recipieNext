import { Pizza, IceCream, HandPlatter } from 'lucide-react';

const WhatWeOffer = () => {
  const offerings = [
    {
      icon: <Pizza className='text-4xl text-secondary' />,
      title: 'Delicious Pizzas',
      description:
        'Enjoy a variety of handcrafted pizzas with fresh ingredients and unique flavors.',
    },
    {
      icon: <HandPlatter className='text-4xl text-secondary' />,
      title: 'Juicy Burgers',
      description:
        'Sink your teeth into our juicy, perfectly grilled burgers for the ultimate treat.',
    },
    {
      icon: <IceCream className='text-4xl text-secondary' />,
      title: 'Tasty Desserts',
      description:
        'Indulge in our delicious desserts, from creamy ice creams to decadent cakes.',
    },
  ];

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl sm:text-4xl font-extrabold mb-6'>
          What We Offer
        </h2>
        <p className='text-lg sm:text-xl mb-12 text-gray-600'>
          Discover our carefully curated menu filled with a variety of dishes to
          satisfy your cravings.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-0'>
          {offerings.map((offer, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-secondary'
            >
              <div className='flex justify-center mb-4'>{offer.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{offer.title}</h3>
              <p className='text-gray-600'>{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
