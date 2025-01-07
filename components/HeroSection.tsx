'use client';

import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className='flex flex-col md:flex-row items-center justify-between min-h-screen'>
      {/* Left Side - Text */}
      <div className='w-full md:w-1/2 space-y-6 text-center md:text-left'>
        <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight'>
          Discover the Best Recipes Here
        </h1>
        <p className='text-lg sm:text-xl'>
          Get access to an amazing collection of recipes that will make your
          cooking experience exciting and delicious.
        </p>
        <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start'>
          <Link href='/allrecipes' passHref>
            <button className='px-6 py-3 bg-secondary text-white rounded-lg shadow-lg transition-all duration-300 transform hover:bg-transparent hover:text-secondary hover:scale-105 hover:shadow-xl w-1/2 md:w-max'>
              Explore Recipes
            </button>
          </Link>
          <Link href='/learn-more' passHref>
            <button className='px-6 py-3 bg-transparent border-2 border-bisque rounded-lg transition-all duration-300 transform hover:bg-secondary hover:text-white hover:scale-105 hover:shadow-xl w-1/2 md:w-max'>
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='w-full md:w-1/2 mt-8 md:mt-0'>
        <div className='relative w-full h-full'>
          <Image
            src='/recipe.jpeg'
            alt='Recipe'
            width={500}
            height={300}
            className='w-full'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
