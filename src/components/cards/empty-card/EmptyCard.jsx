import React from "react";
import "./style.css";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="no-note-container">
      <img src={imgSrc} alt="No notes" className="no-note-img" />
      <p className="no-note-message">{message}</p>
    </div>
  );
};

export default EmptyCard;
