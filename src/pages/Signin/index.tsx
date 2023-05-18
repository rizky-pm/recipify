import { Col, Form, Input, Button } from 'antd';

import SigninStyled from './signin.styled';
import { SigninValues } from '../../types';

const SigninPage = () => {
  const [form] = Form.useForm();

  return (
    <SigninStyled>
      <Col span={8} className='form--container'></Col>
    </SigninStyled>
  );
};

export default SigninPage;
