import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {isError && <p>{message}</p>}
      {isSuccess && <p>Login successful</p>}
    </div>
  );
}
