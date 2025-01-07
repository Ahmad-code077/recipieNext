export type Recipe = {
  id: number;
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
