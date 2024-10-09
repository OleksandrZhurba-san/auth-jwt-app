import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protectedRoute";
import { Flex, Menu } from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Home from "./pages/home";

function App() {
  const [current, setCurrent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  function handleIsLoggedIn() {
    return token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }
  const onClick = (event) => {
    setCurrent(event.key);
  };
  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "login",
      label: <Link to="/login">Login</Link>,
      icon: <LoginOutlined />,
    },
    {
      key: "register",
      label: <Link to="/register">Register</Link>,
      icon: <UserAddOutlined />,
    },
    {
      key: "profile",
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />,
      disabled: isLoggedIn,
    },
  ];
  useEffect(() => {
    handleIsLoggedIn();
  }, [isLoggedIn, handleIsLoggedIn]);
  return (
    <Flex gap="middle" vertical justify="start" align="center">
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </nav> */}
      <Menu
        onClick={onClick}
        selectedKeys={{ current }}
        mode="horizontal"
        items={items}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Flex>
  );
}

export default App;
