import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetState } from "../../redux/slices/authSlice";
import { Flex, Button, Form, Input, Space } from "antd";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    if (isSuccess) {
      navigate("/profile");
    }

    return () => {
      dispatch(resetState());
    };
  }, [isSuccess, navigate, dispatch]);

  return (
    <Flex justify="center" align="center">
      <Form
        form={form}
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please fill email!" }]}
        >
          <Input name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please fill the password",
            },
          ]}
        >
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button onClick={handleReset} htmlType="button">
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Login successful</p>}
    </Flex>
  );
}
