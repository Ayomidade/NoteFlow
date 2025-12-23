import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation } from "../../utils/helper";
import AuthLayout from "../../components/layouts/Layout";
import "../../styles/auth.css";
import axiosInstance from "../../utils/axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName && !lastName && !email && !password) {
      setError("Can't submit an empty form");
      return;
    }

    if (!firstName || !lastName) {
      return setError("Firstname and Lastname are required to continue");
    }
    if (!password) {
      return setError("Please enter a valid password");
    }

    if (!emailValidation(email)) {
      return setError("Please enter a valid email");
    }

    if (password !== confirmPassword) {
      return setError("Passwords are not the same");
    }
    setLoading(true);

    setError("");

    // SIGNUP API
    try {
      const response = await axiosInstance.post("/new-user", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });

      // Successful Sign-up
      if (response.data && response.data.token) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      // Error handling
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Sign-up failed, please try again.");
      }
      setLoading(null);
    }
  };
  return (
    <>
      <AuthLayout>
        <div className="form-container">
          <div className="form-inner-container">
            <form onSubmit={handleSignup} className="auth-form">
              <h4 className="auth-title">Sign-up</h4>
              <input
                type="text"
                placeholder="Firstname"
                className="input-box"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <input
                type="text"
                placeholder="Lastname"
                className="input-box"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />

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

              <PasswordInput
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder={"Confirm Password"}
              />
              {/* <input type="text" placeholder="Password" className="input-box" /> */}

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Please wait" : "Create Account"}
              </button>

              <p className="auth-switch">
                Have an Account? <Link to={"/login"}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Signup;
