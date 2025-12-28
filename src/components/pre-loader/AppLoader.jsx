import React from "react";
import "./loader.css";

const AppLoader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppLoader;
