import React, { useState } from "react";
import "./pass.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="password-container">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="password-input"
      />

      {/* Replace with FaRegEye and FaRegEyeSlash icon from react-icons */}
      {isShowPassword ? (
        <FaRegEye
          // size={20}
          className="show-password"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          // size={20}
          className="show-password"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
