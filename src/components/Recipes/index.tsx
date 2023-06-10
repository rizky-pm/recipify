import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Level, Star } from '@icon-park/react';
import dayjs from 'dayjs';

import { recipesData } from '../../data';
import { RecipesStyled } from './styled';

type Filter = 'relevant' | 'latest' | 'top';
type TimeRange = 'week' | 'month' | 'year' | 'all time';
type Recipe = {
  id: number;
  name: string;
  description: string;
  image: string;
  author: string;
  datePosted: number;
  rating: number;
  difficulty: string;
};

type Props = {
  filter: Filter;
  timeRange: TimeRange;
};

const Recipes: React.FC<Props> = ({ filter, timeRange }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  const handleNavigate = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  console.log(filter, timeRange);

  useEffect(() => {
    const toBeSortedRecipes = recipesData;
    if (filter === 'relevant' || filter === 'top') {
      setRecipes(recipesData);
    }

    if (filter === 'latest') {
      const sortedRecipes = toBeSortedRecipes.sort(
        (a, b) => b.datePosted - a.datePosted
      );
      console.log('recipes', recipesData);
      console.log('soretd recipes >>>', recipesData);

      setRecipes(sortedRecipes);
    }
  }, [filter]);

  return (
    <RecipesStyled>
      {recipes.map((data) => (
        <div
          key={data.id}
          className='card'
          onClick={() => {
            handleNavigate(data.id);
          }}
        >
          <img className='image' src={data.image} alt='' />
          <div className='content'>
            <h3>{data.name}</h3>
            <div className='header'>
              <span className='author'>
                By <span className='author__name'>{data.author}</span>
              </span>
              <span>{dayjs.unix(data.datePosted).format('DD MMM')}</span>
            </div>
            <p className='description'>{data.description}</p>
          </div>
          <div className='footer'>
            <span>
              <Level />
              {data.difficulty}
            </span>
            <span>
              <Star />
              {data.rating}
            </span>
          </div>
        </div>
      ))}
    </RecipesStyled>
  );
};

export default Recipes;
