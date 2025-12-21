import React from "react";
import "./layout.css";
import { useNavigate } from "react-router-dom";

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
        <div className="auth-right-content">
          <h1 className="auth-hero-title">
            Enter the future <br />
            of Notes, <span>today.</span>
          </h1>
          <p className="auth-hero-sub">Fast. Secure. Always with you.</p>

          {/* Placeholder mockup block */}
          <div className="auth-card-mock"></div>
        </div>
      </div>
    </div>
  );
}
