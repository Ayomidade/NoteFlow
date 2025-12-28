import React, { useState } from "react";
import "./profile.css";
import { getInitials } from "../../utils/helper";
import { FaSignOutAlt } from "react-icons/fa";
import Spinner from "../pre-loader/spinner/Spinner";

const ProfileInfo = ({ onLogout, userInfo, loggingOut }) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleShowProfile = () => {
    setShowProfile(!showProfile);
  };
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

      {/* For MMobile */}
      <div className="mobile-profile-info">
        <div className="profile-initial" onClick={toggleShowProfile}>
          {getInitials(userInfo)}
        </div>
        {showProfile && (
          <div className="mobile-profile-details">
            <p className="profile-name">{userInfo}</p>
            <button className="logout-btn" onClick={onLogout}>
              {loggingOut ? <Spinner /> : "Logout"}
              <FaSignOutAlt />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
