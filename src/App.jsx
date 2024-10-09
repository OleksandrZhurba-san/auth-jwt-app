import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
function Home() {
  return <div>home</div>;
}

export default App;
