import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetState } from "../../redux/slices/authSlice";
import { Flex, Button, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [clientReady, setClientReady] = useState(false);
  const [form] = Form.useForm();
  // const { email, password } = formData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSubmit() {
    dispatch(login({ email: formData.email, password: formData.password }));
  }
  function handleReset() {
    form.resetFields();
  }

  useEffect(() => {
    setClientReady(true);
    if (isSuccess) {
      navigate("/profile");
    }

    return () => {
      dispatch(resetState());
    };
  }, [isSuccess, navigate, dispatch]);

  return (
    <>
      <Form form={form} name="login" autoComplete="off" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            prefix={<UserOutlined />}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Login\Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Item>
        <Flex gap={8}>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          <Form.Item>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Form.Item>
        </Flex>
      </Form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Login successful</p>}
    </>
  );
}
