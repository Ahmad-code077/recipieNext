import Recipies from './Recipes';
import StaticContent from './StaticContent';

const RecipiesMain: React.FC = () => {
  return (
    <div>
      <StaticContent />
      <Recipies />
    </div>
  );
};
export default RecipiesMain;
