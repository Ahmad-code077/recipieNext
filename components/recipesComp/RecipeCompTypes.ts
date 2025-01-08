export type Recipe = {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
};

export type RecipeCardProps = {
  recipe: Recipe;
};

export type RecipesSearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
