import React, { useState } from "react";
import "./style.css";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = () => {};

  const clearSearch = () => {};

  return (
    <>
      <nav>
        <div className="logo-container">
          <img className="logo" src="/notepad-and-pen.svg" alt="notes-logo" />
          <h2 className="logo-name">
            Note<span>Flow</span>
          </h2>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onclearSearch={clearSearch}
        />

        <ProfileInfo onLogout={onLogout} />
      </nav>
    </>
  );
};

export default Navbar;
