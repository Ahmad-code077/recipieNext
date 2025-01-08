'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RecipeList from './RecipeList';
import AddRecipePopup from './AddRecipePopup';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/'); // If not admin, redirect to home
    } else {
      fetchRecipes();
    }
  }, [router]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 bg-white border-b-2 border-gray-200'>
        <h1 className='text-3xl font-bold text-black'>Admin Page</h1>

        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='text-lg rounded-lg bg-secondary hover:bg-secondary/90 text-white transition-all duration-300 hover:scale-105'
        >
          Add New Recipe
        </Button>
      </div>

      {/* Recipe List Section */}
      <div className='p-6'>
        <RecipeList recipes={recipes} refreshRecipes={fetchRecipes} />
      </div>

      {/* Add Recipe Popup */}
      {showAddPopup && (
        <AddRecipePopup
          onClose={() => setShowAddPopup(false)}
          refreshRecipes={fetchRecipes}
        />
      )}
    </div>
  );
};

export default AdminPage;
