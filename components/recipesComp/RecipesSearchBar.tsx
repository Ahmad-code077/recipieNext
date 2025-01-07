import { RecipesSearchBarProps } from './RecipeCompTypes';

const RecipesSearchBar: React.FC<RecipesSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className='my-8'>
      <label
        htmlFor='search'
        className='block text-lg font-semibold text-primary mb-2'
      >
        Search Your Favourite Recipes
      </label>
      <div className='flex items-center'>
        <input
          type='text'
          id='search'
          placeholder='Search recipes...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-6 py-3 w-96 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ease-in-out'
        />
      </div>
    </div>
  );
};

export default RecipesSearchBar;
