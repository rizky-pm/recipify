import { css } from 'styled-components';

const variables = css`
  :root {
    --color-dark: #272635;
    --color-light-gray: #f4f4f9;
    --color-light: #fffbfc;
    --color-primary: #1a936f;
    --color-primary-light: #5fb39a;
    --color-secondary: #f9a03f;
    --color-secondary-light: #fbbd79;

    --fz-xxs: 0.25rem;
    --fz-xs: 0.5rem;
    --fz-sm: 0.75rem;
    --fz-base: 1rem;
    --fz-lg: 1.5rem;
    --fz-xl: 2rem;
    --fz-xxl: 2.5rem;

    --spacing-xxs: 0.25rem;
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 4rem;

    --transition-quick: all 0.1s ease-in-out;
    --transition-base: all 0.25s ease-in-out;
    --border-radius-rounded: 0.1875rem;
    --border-radius-base: 0.3125rem;
    --box-shadow-section: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    --box-shadow: rgba(105, 177, 218, 0.25) 0rem 0.125rem 0.5rem 0rem;
  }
`;

export default variables;
