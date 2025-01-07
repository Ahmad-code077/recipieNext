'use client';
import { useEffect, useState } from 'react';
import { Recipe } from './RecipeCompTypes';
import RecipeCard from './RecipeCard';
import RecipesSearchBar from './RecipesSearchBar';

const Recipies: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Add search term state
  const apiEndpoint = 'http://localhost:5000/recipes';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Recipe[] = await response.json(); // The response directly contains the array of recipes
        setRecipes(data); // Directly setting the fetched array to the state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Accessing the error message safely
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [apiEndpoint]);

  // Filter recipes based on the search term
  const filteredRecipes: Recipe[] = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className='my-8'>
      <RecipesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Recipe Cards */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        {filteredRecipes?.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <blockquote className='flex flex-col-reverse items-center justify-between w-full p-6 transition-all duration-200 rounded-lg md:flex-row ease-in-out border-primary border text-center lg:text-left'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-2xl font-medium text-gray-800 dark:text-white'>
                No Recipe Found for this
              </h1>
              <p className='mt-2 text-base text-gray-600 dark:text-gray-300'>
                We couldn&apos;t find any recipes matching your search. Try
                different keywords
              </p>
            </div>
          </blockquote>
        )}
      </div>
    </section>
  );
};

export default Recipies;
