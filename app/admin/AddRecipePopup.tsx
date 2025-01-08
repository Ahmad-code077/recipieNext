'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toasts/DestructiveToast';

const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  instructions: z.string().min(1, 'Instructions are required'),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface AddRecipePopupProps {
  onClose: () => void;
  refreshRecipes: () => void;
}

const AddRecipePopup: React.FC<AddRecipePopupProps> = ({
  onClose,
  refreshRecipes,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
  });

  const handleAddRecipe = async (data: RecipeFormValues) => {
    try {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ingredients: data.ingredients.split(',').map((i) => i.trim()),
        }),
      });

      if (response.ok) {
        showToast({
          title: 'Recipe Added Successfully!',
          description: `Item Added`,
        });
        refreshRecipes();
        onClose();
      } else {
        showToast({
          title: 'Error Adding Recipe',
          description: 'There was an error while adding the recipe.',
          variant: 'destructive',
        });
        console.error('Error adding recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast({
        title: 'Error',
        description:
          'An error occurred while adding the recipe. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-secondary mb-4'>
          Add New Recipe
        </h2>
        <form onSubmit={handleSubmit(handleAddRecipe)} className='space-y-4'>
          <div>
            <Input placeholder='Enter recipe title' {...register('title')} />
            {errors.title && (
              <p className='text-red-500 text-sm'>
                {String(errors.title.message)}
              </p>
            )}
          </div>
          <div>
            <Input placeholder='Enter image URL' {...register('image')} />
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
              className='w-full p-2 border rounded-lg text-gray-700'
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
              className='bg-gray-300 text-black hover:bg-gray-400 transition duration-200'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-secondary text-white hover:bg-secondary/900 transition duration-200'
            >
              Add Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePopup;
