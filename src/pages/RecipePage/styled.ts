import styled from 'styled-components';

type Props = {
  img?: string;
};

const RecipePageStyled = styled.div<Props>`
  position: relative;
  display: flex;
  padding: 96px 0 24px 0;

  .sidebar {
    position: sticky;
    top: 10%;
    left: 0;
    height: 50vh;
    padding: var(--spacing-xxl) var(--spacing-xl);
    border-radius: var(--border-radius-rounded);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: var(--spacing-xl);

    .icon {
      cursor: pointer;
      padding: var(--spacing-xs);
      border-radius: var(--border-radius-base);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: var(--transition-quick);
      color: var(--color-dark);

      &:hover {
        background-color: var(--color-dark);
        color: var(--color-light);
      }
    }
  }

  .recipe__detail {
    width: 55%;
    background-color: var(--color-light-gray);
    /* padding: var(--spacing-sm) 0; */
    margin-left: var(--spacing-xl);
    display: flex;
    row-gap: var(--spacing-md);
    flex-direction: column;
    border-radius: var(--border-radius-base);
    overflow: hidden;
  }

  ul,
  ol {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-md);
  }

  .recipe__meta {
    display: flex;
    align-items: center;
    column-gap: var(--spacing-xl);
    padding: 0 var(--spacing-xl);
  }

  .recipe__meta > span {
    display: flex;
    align-items: center;
    column-gap: var(--spacing-xs);
  }

  .recipe__title {
    font-size: var(--fz-xl);
    font-weight: 700;
    padding: 0 var(--spacing-xl);
  }

  .recipe__image {
    background: url(${(props) => props.img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .recipe__content {
    display: flex;
    row-gap: var(--spacing-lg);
    flex-direction: column;
    padding: 0 var(--spacing-xl);
  }
`;

export default RecipePageStyled;
