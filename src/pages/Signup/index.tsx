import { Form, Col, Input, Button } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirebase } from '../../firebase';
import SignupStyled from './signup.styled';
import { SignupValues } from '../../types';
import { handleValidatePassword } from '../../utilities';

const SignupPage = () => {
  const { auth } = getFirebase();
  const [form] = Form.useForm();

  const onFinish = async (values: SignupValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (e) {
      console.log('Something went wrong');
    }
  };

  return (
    <SignupStyled>
      <Col span={8} className='form--container'>
        <Form name='signin' form={form} onFinish={onFinish}>
          <Form.Item>
            <h1>Join Us!</h1>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input your email address!',
              },
              {
                type: 'email',
                message: 'Invalid email address',
              },
            ]}
            name={'email'}
          >
            <Input placeholder='Email Address' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please input your password!' }]}
            name={'password'}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item
            name={'passwordConfirmation'}
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              {
                validator(_, value) {
                  return handleValidatePassword(form, _, value, 'password');
                },
              },
            ]}
          >
            <Input.Password placeholder={'Confirm Password'} />
          </Form.Item>
          <Form.Item>
            <Button className='btn--primary' type='primary' htmlType='submit'>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </SignupStyled>
  );
};

export default SignupPage;
