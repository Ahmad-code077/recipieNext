import UpdateRecipePopup from './UpdateRecipePopup';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';
import Image from 'next/image';

interface Recipe {
  id: number | string;
  title: string;
  image: string;
  ingredients: string;
  instructions: string;
}

interface RecipeListProps {
  recipes: Recipe[];
  refreshRecipes: () => void;
}

const RecipeList = ({ recipes, refreshRecipes }: RecipeListProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className='py-6'>
      <h2 className='text-2xl font-bold text-black mb-6'>All Recipes</h2>
      {recipes.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className='bg-white shadow-md rounded-lg overflow-hidden border-2 border-secondary hover:shadow-lg transition-shadow w-full'
            >
              <div className='relative w-full h-48'>
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-t-lg'
                />
              </div>
              <div className='p-4'>
                <h3 className='text-xl font-semibold text-secondary'>
                  {recipe.title}
                </h3>
                <p className='text-sm text-gray-600 mt-2'>
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className='text-sm text-gray-600 mt-2'>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <div className='mt-4 flex space-x-2'>
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className='px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 transition-all'
                  >
                    Update
                  </button>
                  <DeleteRecipeButton
                    recipeId={recipe.id}
                    refreshRecipes={refreshRecipes}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600 text-center'>No recipes available.</p>
      )}

      {selectedRecipe && (
        <UpdateRecipePopup
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          refreshRecipes={refreshRecipes}
        />
      )}
    </div>
  );
};

export default RecipeList;
