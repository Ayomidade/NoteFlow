import React from "react";
import "./search.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onclearSearch }) => {
  return (
    <>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Search Notes"
          value={value}
          onChange={onChange}
          className="searchbar"
        />

        {value && <IoMdClose className="clear-icon" onClick={onclearSearch} />}
        <FaMagnifyingGlass className="search-icon" onClick={handleSearch} />
      </div>
    </>
  );
};

export default SearchBar;
