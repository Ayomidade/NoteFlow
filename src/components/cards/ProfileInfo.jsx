import React from "react";
import "./profile.css";
import { getInitials } from "../../utils/helper";
import { FaSignOutAlt } from "react-icons/fa";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <>
      <div className="profile-info">
        <div className="profile-initial">{getInitials(userInfo)}</div>

        {/* <div className="mini-container"> */}
          <p className="profile-name">{userInfo} </p>
          {/* <button className="logout-btn" onClick={onLogout}>Logout</button> */}
        {/* </div> */}
          <FaSignOutAlt className="logout-icon" size={17} onClick={onLogout} />
      </div>
    </>
  );
};

export default ProfileInfo;
