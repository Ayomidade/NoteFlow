import React from "react";
import "./layout.css";
import { useNavigate } from "react-router-dom";
import locked from "/locked.png"

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="auth-split">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-left-inner">
          {/* <div onClick={() => navigate("/")}> */}
          <img
            src="./logo.svg"
            className="auth-logo"
            alt="noteflow logo"
            onClick={() => navigate("/")}
          />
          {/* </div> */}
          {children}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
          <img src={locked} alt="lock" />
      </div>
    </div>
  );
}
