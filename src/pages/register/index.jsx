import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Flex, Form } from "antd";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isLoading, isError, isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  const { email, password, confirmPassword } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    return () => {
      dispatch(resetState());
    };
  }, [isSuccess, navigate, dispatch]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }
    dispatch(register({ email, password }));
  }
  return (
    <Flex justify="center" align="center">
      <Form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
        />
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Register</button>
      </Form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Register successful</p>}
    </Flex>
  );
}
