import { styled } from "styled-components";

const NavbarStyled = styled.nav`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-light);
  border-bottom: 2px solid var(--color-primary);

  .logo {
    font-family: "Lobster", cursive;
    color: var(--color-dark);
    font-size: var(--fz-xl);
    cursor: pointer;
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

  .user__icon {
    padding: var(--spacing-xxs);
    border: 1px solid var(--color-dark);
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition-quick);

    &:hover {
      border: 1px solid rgb(26, 147, 111);
      box-shadow: rgba(95, 179, 154, 0.5) 0px 0px 0px 3px;
    }
  }
`;

export default NavbarStyled;
