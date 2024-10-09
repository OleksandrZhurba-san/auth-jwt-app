import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    setFormData({ ...formData, [name]: value });
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
    <div>
      <form onSubmit={handleSubmit}>
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
      </form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Register successful</p>}
    </div>
  );
}
