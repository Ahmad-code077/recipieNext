'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Recipe } from '@/components/recipesComp/RecipeCompTypes';
import Image from 'next/image';

const SingleRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        // Using mock data from db.json
        const response = await fetch('http://localhost:5000/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data: Recipe[] = await response.json();
        const foundRecipe = data.find((recipe: Recipe) => recipe.id === id);

        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          setError('Recipe not found');
        }
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

    fetchRecipe();
  }, []);

  if (loading)
    return (
      <p className='text-center text-gray-700 dark:text-gray-300 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Loading...
      </p>
    );
  if (error)
    return (
      <p className='text-center text-red-600 dark:text-red-400 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Error: {error}
      </p>
    );

  return (
    <section className='p-8 bg-gradient-to-br from-primary to-secondary shadow-xl dark:shadow-2xl dark:bg-gray-900 rounded-xl'>
      {recipe ? (
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Image Section */}
          <div className='flex-shrink-0 w-full md:w-1/2 flex justify-center items-center'>
            <Image
              className='w-full h-[400px] object-cover rounded-xl shadow-xl border-4 border-gray-200 dark:border-gray-700 transition-transform duration-500 transform hover:scale-105 hover:rotate-3'
              src={recipe.image}
              alt={recipe.title}
              priority
              width={960}
              height={540}
            />
          </div>

          {/* Content Section */}
          <div className='flex flex-col md:w-1/2'>
            <h1 className='text-5xl font-extrabold text-gray-900 dark:text-white my-4 sm:my-12'>
              {recipe.title}
            </h1>
            <div className='space-y-6'>
              <div>
                <h3 className='text-3xl font-semibold text-gray-900 dark:text-white'>
                  Ingredients:
                </h3>
                <ul className='flex flex-wrap gap-4 mt-2'>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className='px-6 py-3 rounded-full text-gray-800 dark:text-gray-200 bg-primary/90 dark:bg-muted-800 font-medium text-lg shadow-md hover:bg-primary/70 dark:hover:bg-muted-600 cursor-pointer transition-all transform hover:scale-110'
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='text-3xl font-semibold text-gray-900 dark:text-white'>
                  Instructions:
                </h3>
                <p className='text-lg text-gray-700 dark:text-gray-300'>
                  {recipe.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-700 dark:text-gray-300 text-lg font-medium'>
          Recipe not found.
        </p>
      )}
    </section>
  );
};

export default SingleRecipe;
