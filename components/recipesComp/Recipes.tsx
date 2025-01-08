'use client';
import { useEffect, useState } from 'react';
import { Recipe } from './RecipeCompTypes';
import RecipeCard from './RecipeCard';
import RecipesSearchBar from './RecipesSearchBar';

const Recipies: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<'date' | 'title'>('date'); // Added sorting option state
  const apiEndpoint = 'http://localhost:5000/recipes';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [apiEndpoint]);

  // Sort recipes based on the selected option
  const sortedRecipes = recipes.sort((a, b) => {
    if (sortOption === 'date') {
      // Assuming the id reflects the creation time (could be replaced with date field if available)
      return a.id > b.id ? -1 : 1;
    } else {
      // Sorting by title
      return a.title.localeCompare(b.title);
    }
  });

  // Filter recipes based on the search term
  const filteredRecipes = sortedRecipes.filter(
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
      <div className='flex justify-between items-center flex-wrap md:flex-nowrap mb-4'>
        <RecipesSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {/* Sorting Dropdown */}
        <select
          className='px-4 py-2 border-2 border-secondary rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-all ease-in-out'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as 'date' | 'title')}
        >
          <option value='date'>Sort by Date</option>
          <option value='title'>Sort by Title</option>
        </select>
      </div>
      {/* Recipe Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  justify-items-center'>
        {filteredRecipes.length > 0 ? (
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
