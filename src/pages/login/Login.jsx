import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { emailValidation } from "../../utils/helper";
import AuthLayout from "../../components/layouts/Layout";
import "../../styles/auth.css";
import axiosInstance from "../../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailValidation(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setLoading(true);

    setError("");

    // LOGIN API

    try {
      const response = await axiosInstance.post("/login", { email, password });

      // Succesful Login
      if (response.data && response.data.token) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }

      // Error handing
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Login failed, please try again.");
      }
      setLoading(null);
    }
  };
  return (
    <>
      {/* <Navbar /> */}

      <AuthLayout>
        {/* <div className="form-container">
          <div className="form-inner-container"> */}
        <form onSubmit={handleLogin} className="auth-form">
          <h4 className="auth-title">Login</h4>

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* <input type="text" placeholder="Password" className="input-box" /> */}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Please wait" : "Login"}
          </button>
          <p className="auth-switch">
            Not registered yet? <Link to={"/signup"}>Create an Account</Link>
          </p>
        </form>
        {/* </div>
        </div> */}
      </AuthLayout>
    </>
  );
};

export default Login;
