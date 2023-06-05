import styled from "styled-components";

const ToolBarStyled = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .filter {
    display: flex;
    column-gap: var(--spacing-lg);
    align-items: center;
  }

  .time-range {
    display: flex;
    column-gap: var(--spacing-lg);
    align-items: center;
  }

  .check-box {
    padding: var(--spacing-xs);
    cursor: pointer;
    transition: var(--transition-quick);

    &:hover {
      color: var(--color-primary);
    }
  }
`;

export default ToolBarStyled;
