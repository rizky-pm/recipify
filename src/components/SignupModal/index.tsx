import { FC, Dispatch, SetStateAction } from "react";
import { Modal, Form, Input } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { getFirebase } from "../../firebase";
import { SignupValues } from "../../types";
import { handleValidatePassword } from "../../utilities";
import { Btn } from "../../styles/GlobalStyled";

type Props = {
  showSignupModal: boolean;
  setShowSignupModal: Dispatch<SetStateAction<boolean>>;
};

const SignupModal: FC<Props> = ({ showSignupModal, setShowSignupModal }) => {
  const [form] = Form.useForm();
  const { auth } = getFirebase();

  const toggleModal = () => {
    form.resetFields();
    setShowSignupModal(!showSignupModal);
  };

  const onFinish = async (values: SignupValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <Modal
      open={showSignupModal}
      onOk={toggleModal}
      onCancel={toggleModal}
      footer={null}
    >
      <Form name="signup" form={form} onFinish={onFinish}>
        <Form.Item>
          <h1>Join Us!</h1>
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

        <Form.Item
          name={"passwordConfirmation"}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            {
              validator(_, value) {
                return handleValidatePassword(form, _, value, "password");
              },
            },
          ]}
        >
          <Input.Password placeholder={"Confirm Password"} />
        </Form.Item>
        <Form.Item>
          <Btn className="btn--full-w" type="primary" htmlType="submit">
            Sign Up
          </Btn>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupModal;
