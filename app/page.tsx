import HeroSection from '@/components/HeroSection';
import Recipies from '@/components/recipesComp/Recipes';
import WhatWeOffer from '@/components/WhatWeOffer';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhatWeOffer />
      <Recipies />
    </div>
  );
};
export default Home;
