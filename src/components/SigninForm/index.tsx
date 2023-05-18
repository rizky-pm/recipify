import { Form, Input, Button } from 'antd';

import { SigninValues } from '../../types';

const SigninForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: SigninValues) => {
    console.log('Success', values);
  };
  return (
    <Form name='signin' form={form} onFinish={onFinish}>
      <Form.Item>
        <h1>Welcome Back!</h1>
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
      <Form.Item>
        <Button className='btn--primary' type='primary' htmlType='submit'>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
