import { FC, Dispatch, SetStateAction } from "react";
import { Modal, Form, Input } from "antd";

import { Btn } from "../../styles/GlobalStyled";
import { handleValidatePassword } from "../../utilities";
import { SigninValues } from "../../types";

type Props = {
  showSigninModal: boolean;
  setShowSigninModal: Dispatch<SetStateAction<boolean>>;
};

const SigninModal: FC<Props> = ({ showSigninModal, setShowSigninModal }) => {
  const [form] = Form.useForm();

  const toggleModal = () => {
    form.resetFields();
    setShowSigninModal(!showSigninModal);
  };

  const onFinish = (values: SigninValues) => {
    console.log(values);
  };

  return (
    <Modal
      open={showSigninModal}
      onOk={toggleModal}
      onCancel={toggleModal}
      footer={null}
    >
      <Form name="signin" form={form} onFinish={onFinish}>
        <Form.Item>
          <h1>Welcome Back!</h1>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email address!",
            },
            {
              type: "email",
              message: "Invalid email address",
            },
          ]}
          name={"email"}
        >
          <Input placeholder="Email Address" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Please input your password!" },
            {
              validator(_, value) {
                return handleValidatePassword(form, _, value, "password");
              },
            },
          ]}
          name={"password"}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Btn className="btn--full-w" type="primary" htmlType="submit">
            Sign In
          </Btn>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SigninModal;
