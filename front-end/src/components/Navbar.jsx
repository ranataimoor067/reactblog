import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import menuIcon from "../assets/menu.svg";
import closeIcon from "../assets/close.svg";
import { link } from "./Baselink";
import { BsMoon, BsSun } from "react-icons/bs";  // You can import icons from react-icons

const Navbar = ({ theme, toggleTheme }) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const url = `${link}`;
  const [loginCredential, setLoginCredential] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "/api/auth/login", {
        credential: loginCredential,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      setIsLoggedIn(true);
      setUser(response.data.username);
      navigate("/");
      handleClose();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.status === 401
          ? "Invalid credentials. Please check your email/username and password."
          : error.response?.status === 404
          ? "User not found. Please check your email/username."
          : "An error occurred during login. Please try again later.";
      setError(errorMessage);
    }
  };

  const register = async (event) => {
    event.preventDefault();
    if (!validateRegistration()) return;

    try {
      const response = await axios.post(url + "/api/auth/register", {
        username: loginCredential,
        email,
        password,
        name,
        location,
        picture,
        dob,
      });
      const token = response.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      setIsLoggedIn(true);
      setUser(loginCredential);
      navigate("/");
      handleClose();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.status === 409
          ? "Username or email already exists. Please choose different credentials."
          : error.response?.status === 400
          ? "Invalid registration data. Please check all fields."
          : "An error occurred during registration. Please try again later.";
      setError(errorMessage);
    }
  };

  const validateRegistration = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!loginCredential || !email || !password || !name) {
      setError("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setLoginCredential("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setLocation("");
    setPicture("");
    setDob("");
    setError("");
  };

  const handleOpen = () => {
    setOpen(true);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(url + "/api/auth/getProfile")
        .then((response) => {
          setIsLoggedIn(true);
          setUser(response.data.user.username);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setUser("");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <div
        id="navbar"
        className="flex justify-between items-center p-4 text-[18px] bg-green-900 text-white transition-all duration-300 ease-in-out"
      >
        <div id="logo" className="font-bold hover:text-green-400 transition-colors duration-300 ease-in-out">
          <Link to="/">React Blog</Link>
        </div>

        <div id="comp" className="hidden md:flex justify-center items-center">
          <ul className="flex space-x-6 font-semibold text-sm">
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              <Link to="/about">About</Link>
            </li>
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              <Link to="/article-list">Articles</Link>
            </li>
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <p
                    className="cursor-pointer hover:text-green-300"
                    onClick={handleProfileClick}
                  >
                    {user}
                  </p>
                  <button
                    onClick={logout}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpen}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out"
                >
                  Login/Register
                </button>
              )}
            </li>
            <li className="py-4">
              <button
                className="theme-toggler transition-all duration-300"
                onClick={toggleTheme}
              >
                {/* Light Mode Circle with hover */}
                {theme === "light" ? (
                  <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                    <BsSun className="text-yellow-500 text-xl" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                    <BsMoon className="text-white text-xl" />
                  </div>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div className="sm:flex md:hidden justify-between items-center">
          <img
            src={toggle ? closeIcon : menuIcon}
            className="h-[24px] w-[24px] cursor-pointer transition-all duration-300 ease-in-out"
            alt="menu"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-gradient-to-r from-green-700 to-green-900 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-md transition-all duration-300 ease-in-out`}
          >
            <ul className="list-none flex flex-col space-y-3">
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                <Link to="/">Home</Link>
              </li>
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                <Link to="/about">About</Link>
              </li>
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                <Link to="/article-list">Articles</Link>
              </li>
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                {isLoggedIn ? (
                  <div>
                    <p
                      className="inline-block mr-4 cursor-pointer hover:text-green-300"
                      onClick={handleProfileClick}
                    >
                      {user}
                    </p>
                    <button
                      onClick={logout}
                      className="hover:text-red-300 transition-all duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="hover:text-green-300 transition-all duration-300 ease-in-out"
                  >
                    Login/Register
                  </button>
                )}
              </li>
              <li className="py-4">
                <button
                  className="theme-toggler transition-all duration-300"
                  onClick={toggleTheme}
                >
                  {/* Light Mode Circle with hover */}
                  {theme === "light" ? (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                      <BsSun className="text-yellow-500 text-xl" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                      <BsMoon className="text-white text-xl" />
                    </div>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rest of the code remains same */}
    </>
  );
};

export default Navbar;
