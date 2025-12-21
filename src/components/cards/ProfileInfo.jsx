import React from "react";
import "./profile.css";
import { getInitials } from "../../utils/helper";
import { FaSignOutAlt } from "react-icons/fa";

const ProfileInfo = ({ onLogout }) => {

  

  return (
    <>
      <div className="profile-info">
        <div className="profile-initial">{getInitials("John Doe")}</div>

        <div className="mini-container">
          <p className="profile-name">Michael </p>
          {/* <button className="logout-btn" onClick={onLogout}>Logout</button> */}
          <FaSignOutAlt className="logout-icon" size={17} onClick={onLogout} />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
