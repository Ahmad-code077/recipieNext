import Image from 'next/image';
import { Recipe } from './RecipeCompTypes';
import Link from 'next/link';

type RecipeCardProps = {
  recipe: Recipe;
};

// RecipeCard Component
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className='w-full max-w-md p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.03]  '
    >
      <div className='relative'>
        <Image
          className='w-full h-64 object-cover rounded-3xl mb-6'
          src={recipe.image}
          alt={recipe.title}
          priority
          width={500}
          height={300}
        />
        <div className='absolute top-4 left-4 bg-secondary text-white px-4 py-2 rounded-lg text-lg'>
          {recipe.title}
        </div>
      </div>
      <div className='p-4'>
        <p className='text-gray-700 text-sm mb-4'>
          {recipe.ingredients.slice(0, 3).join(', ')}{' '}
          {recipe.ingredients.length > 3 && '...'}
        </p>
        <Link
          href={`/single/${recipe.id}`}
          className='inline-block px-6 py-2 text-blck font-semibold border-2 border-primary rounded-full hover:bg-secondary hover:text-white transition-all duration-300'
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
