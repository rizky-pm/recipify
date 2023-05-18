import { styled } from 'styled-components';
import { Row } from 'antd';

const SignupStyled = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .form--container {
    border-radius: 5px;
    padding: var(--spacing-md);
    box-shadow: var(--box-shadow-section);
  }

  .btn--primary {
    color: white;
    font-weight: 600;
    outline: none;
    border: none;
    box-shadow: none;
    width: 100%;
  }
`;

export default SignupStyled;
