import { styled } from 'styled-components';

const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-light);
  border-bottom: 2px solid var(--color-primary);

  .logo {
    font-family: 'Lobster', cursive;
    color: var(--color-dark);
    font-size: var(--fz-xl);
  }

  .menu {
    display: flex;
    column-gap: var(--spacing-md);

    &__item {
      align-self: center;
    }

    .divider {
      width: 1px;
      border-right: 1px solid #e1e1e1;
    }
  }
`;

export default NavbarStyled;
