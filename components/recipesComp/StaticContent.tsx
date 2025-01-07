// StaticContent.tsx
const StaticContent: React.FC = () => {
  return (
    <div className='flex-col items-center mt-20'>
      <div className='flex flex-col items-center justify-center w-full h-full max-w-2xl  mx-auto text-center'>
        <p className='my-2 text-sm uppercase font-semibold tracking-widest text-center text-primary'>
          Our Delicious Recipes
        </p>
        <h2 className='text-4xl font-extrabold leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl mb-2'>
          Explore a World of Flavors
        </h2>
      </div>
    </div>
  );
};

export default StaticContent;
