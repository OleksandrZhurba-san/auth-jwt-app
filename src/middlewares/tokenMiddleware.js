import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/slices/authSlice";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token = store.getState().auth.token;
  if (token && isTokenExpired(token)) {
    store.dispatch(logout);
  }
  return next(action);
};
