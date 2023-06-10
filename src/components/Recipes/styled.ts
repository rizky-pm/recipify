import styled from 'styled-components';
import { Card } from 'antd';

export const RecipesStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 2%;
  row-gap: var(--spacing-xl);
  margin: var(--spacing-sm) 0 var(--spacing-xxl) 0;

  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: center;
  justify-content: space-between;
  row-gap: var(--spacing-xxl); */

  .card {
    position: relative;
    width: 23%;
    height: 450px;
    /* border: 2px solid #6b6b6b; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: var(--transition-quick);
    cursor: pointer;

    &:hover {
      transform: translate(0, -5px);
    }

    .image {
      height: auto;
      width: 100%;
    }

    .header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .author {
        &__name {
          &:hover {
            text-decoration: underline;
            text-decoration-color: var(--color-primary);
          }
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      row-gap: var(--spacing-sm);
      padding: var(--spacing-sm);

      .title {
        font-weight: 700;
      }

      .description {
        line-height: 1.25;
        color: #6b6b6b;
        font-weight: 300;
      }
    }

    .footer {
      position: absolute;
      display: flex;
      justify-content: space-between;
      width: 100%;
      bottom: 0;
      left: 0;
      padding: var(--spacing-sm);

      & > span {
        display: flex;
        align-items: center;
        column-gap: var(--spacing-xxs);
      }
    }
  }
`;
