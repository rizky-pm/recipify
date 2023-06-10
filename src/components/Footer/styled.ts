import styled from 'styled-components';

const FooterStyled = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  background-color: var(--color-primary);
  color: var(--color-light);

  .motto {
    .link {
      font-weight: 700;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--color-light);
      }
    }
  }
`;

export default FooterStyled;
