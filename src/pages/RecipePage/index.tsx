import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ChefHat,
  ForkSpoon,
  Level,
  Star,
  Like,
  Comment,
  Bookmark,
  Share,
} from '@icon-park/react';

// import { Container } from '../../styles/GlobalStyled';
import RecipePageStyled from './styled';

import { recipeDetail } from '../../data';
import { recipesData } from '../../data';

type Recipe = {
  id?: number;
  title?: string;
  servings?: number;
  ingredients?: string[];
  instructions?: string[];
  notes?: string[];
  image?: string;
  author?: string;
  datePosted?: string;
  rating?: number;
  difficulty?: string;
};

const RecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe>({});
  const { recipeId } = useParams();

  useEffect(() => {
    const detail = recipeDetail.filter((data: Recipe) => data.id == recipeId);
    if (detail.length > 0) {
      setRecipe(detail[0]);
    }
  }, [recipeId]);

  return (
    <RecipePageStyled img={recipe.image}>
      <div className='sidebar'>
        <Like theme='outline' size='24' className='icon' />
        <Comment theme='outline' size='24' className='icon' />
        <Bookmark theme='outline' size='24' className='icon' />
        <Share theme='outline' size='24' className='icon' />
      </div>
      {recipe && (
        <div className='recipe__detail'>
          <div className='recipe__image'></div>
          <h1 className='recipe__title'>{recipe.title}</h1>
          <div className='recipe__meta'>
            <span className='recipe__servings'>
              <ForkSpoon />
              {recipe.servings} Servings
            </span>
            <span className='recipe__author'>
              <ChefHat />
              {recipe.author}
            </span>
            <span className='recipe__dificulty'>
              <Level />
              {recipe.difficulty}
            </span>
            <span className='recipe__rating'>
              <Star />
              {recipe.rating}
            </span>
          </div>
          <div className='recipe__content'>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}> {ingredient}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <h3>Notes</h3>
            <ul>
              {recipe.notes?.map((note: string, index: number) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </RecipePageStyled>
  );
};

export default RecipePage;
