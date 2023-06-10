import { useState } from 'react';

import MainStyled from './styled';
import { Container } from '../../styles/GlobalStyled';
import Hero from '../../components/Hero';
import Recipes from '../../components/Recipes';
import ToolBar from '../../components/ToolBar';

type Filter = 'relevant' | 'latest' | 'top';
type TimeRange = 'week' | 'month' | 'year' | 'all time';

const MainPage = () => {
  const [filter, setFilter] = useState<Filter>('relevant');
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  return (
    <MainStyled>
      <Hero />
      <Container>
        <ToolBar
          filter={filter}
          setFilter={setFilter}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        <Recipes filter={filter} timeRange={timeRange} />
      </Container>
    </MainStyled>
  );
};

export default MainPage;
