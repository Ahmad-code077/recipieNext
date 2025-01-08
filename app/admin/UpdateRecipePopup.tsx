'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toasts/DestructiveToast';
import React from 'react';

// Define validation schema for the form using zod
const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  instructions: z.string().min(1, 'Instructions are required'),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface UpdateRecipePopupProps {
  recipe: {
    id: number | string;
    title: string;
    image: string;
    ingredients: string;
    instructions: string;
  };
  onClose: () => void;
  refreshRecipes: () => void;
}

const UpdateRecipePopup: React.FC<UpdateRecipePopupProps> = ({
  recipe,
  onClose,
  refreshRecipes,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
  });

  // Reset form whenever the recipe changes
  React.useEffect(() => {
    reset({
      title: recipe.title,
      image: recipe.image,
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(', ') // Convert array to comma-separated string
        : recipe.ingredients,
      instructions: recipe.instructions,
    });
  }, [recipe, reset]);

  const handleUpdateRecipe = async (data: RecipeFormValues) => {
    try {
      const response = await fetch(
        `http://localhost:5000/recipes/${recipe.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            ingredients: data.ingredients.split(',').map((i) => i.trim()), // Convert string to array
          }),
        }
      );

      if (response.ok) {
        showToast({
          title: 'Recipe Updated Successfully!',
          description: 'The recipe has been updated.',
        });
        refreshRecipes();
        onClose(); // Close the popup after updating
      } else {
        showToast({
          title: 'Error Updating Recipe',
          description: 'There was an issue updating the recipe.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while updating the recipe. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Update Recipe
        </h2>
        <form onSubmit={handleSubmit(handleUpdateRecipe)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter recipe title'
              {...register('title')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.title && (
              <p className='text-red-500 text-sm'>
                {String(errors.title.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>
                {String(errors.image.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter ingredients, separated by commas'
              {...register('ingredients')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.ingredients && (
              <p className='text-red-500 text-sm'>
                {String(errors.ingredients.message)}
              </p>
            )}
          </div>
          <div>
            <textarea
              placeholder='Enter instructions'
              {...register('instructions')}
              className='w-full p-2 border rounded-lg bg-gray-100 text-gray-700'
            />
            {errors.instructions && (
              <p className='text-red-500 text-sm'>
                {String(errors.instructions.message)}
              </p>
            )}
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-secondary text-white hover:bg-secondary/90'
            >
              Update Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipePopup;
