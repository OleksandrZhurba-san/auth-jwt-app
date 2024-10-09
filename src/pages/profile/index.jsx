import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("token");
  const tokenData = token ? jwtDecode(token) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!tokenData) {
    return <h1>Unauthorized</h1>;
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      <h1>Token data</h1>
      <p>{tokenData.user.id}</p>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
