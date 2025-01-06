'use client';

import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='flex flex-col md:flex-row items-center justify-between min-h-screen  text-primary '>
      {/* Left Side - Text */}
      <div className='w-full md:w-1/2 space-y-6 text-center md:text-left'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-bisque leading-tight'>
          Discover the Best Recipes Here
        </h1>
        <p className='text-lg sm:text-xl text-bisque'>
          Get access to an amazing collection of recipes that will make your
          cooking experience exciting and delicious.
        </p>
        <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start'>
          <a
            href='#'
            className='px-6 py-3 bg-red text-white rounded-lg shadow-lg hover:bg-bisque hover:text-secondary transition-all duration-300'
          >
            Explore Recipes
          </a>
          <a
            href='#'
            className='px-6 py-3 bg-transparent border-2 border-bisque text-bisque rounded-lg hover:bg-red hover:text-white transition-all duration-300'
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='w-full md:w-1/2 mt-8 md:mt-0'>
        <div className='relative w-full h-full'>
          <Image
            src='/recipe.png'
            alt='Delicious Food'
            layout='responsive'
            width={500}
            height={500}
            className='object-cover rounded-lg'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
