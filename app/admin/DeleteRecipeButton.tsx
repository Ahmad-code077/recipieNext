'use client';

import { useState } from 'react';
import { useShowToast } from '@/components/Toasts/DestructiveToast';

// Define types for the props of DeleteRecipePopup
interface DeleteRecipePopupProps {
  recipeId: number | string;
  onClose: () => void;
  refreshRecipes: () => void;
}

const DeleteRecipePopup: React.FC<DeleteRecipePopupProps> = ({
  recipeId,
  onClose,
  refreshRecipes,
}) => {
  const showToast = useShowToast();

  const handleDeleteRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/recipes/${recipeId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        showToast({
          title: 'Recipe Deleted Successfully!',
          description: 'The recipe has been removed.',
        });
        refreshRecipes();
        onClose(); // Close the popup after deleting
      } else {
        showToast({
          title: 'Error Deleting Recipe',
          description: 'There was an issue deleting the recipe.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while deleting the recipe. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-secondary mb-4'>Are you sure?</h2>
        <p className='text-gray-600 mb-6'>
          Do you really want to delete this recipe? This action cannot be
          undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-black transition duration-200'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteRecipe}
            className='px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Define types for the props of DeleteRecipeButton
interface DeleteRecipeButtonProps {
  recipeId: number | string;
  refreshRecipes: () => void;
}

const DeleteRecipeButton: React.FC<DeleteRecipeButtonProps> = ({
  recipeId,
  refreshRecipes,
}) => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDeletePopup}
        className='px-4 py-2 bg-[#E11D48] text-white rounded-lg hover:bg-[#BE123C] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition duration-200'
      >
        Delete
      </button>

      {isDeletePopupVisible && (
        <DeleteRecipePopup
          recipeId={recipeId}
          onClose={handleCloseDeletePopup}
          refreshRecipes={refreshRecipes}
        />
      )}
    </>
  );
};

export default DeleteRecipeButton;
