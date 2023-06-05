import styled from "styled-components";

const RecipesStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: var(--spacing-xl);

  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  justify-items: center;
  justify-content: space-between;
  row-gap: var(--spacing-xxl); */
`;

export default RecipesStyled;
