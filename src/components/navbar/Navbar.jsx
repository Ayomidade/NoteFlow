import React, { useState } from "react";
import "./style.css";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import AppLoader from "../pre-loader/AppLoader";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, 500);
  };

  const handleSearch = () => {};

  const clearSearch = () => {};

  return (
    <>
      {loggingOut && <AppLoader loading={loggingOut} />}
      <nav>
        <div className="logo-container">
          <img className="logo" src="/notepad-and-pen.svg" alt="notes-logo" />
          <h2 className="logo-name">
            Note<span>Flow</span>
          </h2>
        </div>

        {/* <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onclearSearch={clearSearch}
        /> */}

        <ProfileInfo
          onLogout={onLogout}
          userInfo={userInfo}
          // loggingOut={loggingOut}
        />
      </nav>
    </>
  );
};

export default Navbar;
