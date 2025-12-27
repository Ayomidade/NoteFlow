import React from "react";
import "./style.css";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  setIsReadingFull
}) => {
  return (
    <>
      <div className="note-container">
        <div className="inner-container">
          <div>
            <h6 className="note-title">{title}</h6>
            <span className="note-date">
              {moment(date).format("Do MMMM YYYY, h:mm a")}
            </span>
          </div>

          {/* <MdOutlinePushPin
            onClick={onPinNote}
            className={`icon-btn ${isPinned ? "pinned" : "not-pinned"}`}
          /> */}
        </div>
        <p className="note-content">
          {content?.slice(0, 90)}
          {content && content.length > 60 ? (
            <>
              ...<a onClick={setIsReadingFull} className="more-link">more</a>
            </>
          ) : (
            ""
          )}
        </p>

        <div className="second-inner-container">
          {/* <div className="note-tag">{tags}</div> */}

          <div className="note-btn">
            <MdCreate className="edit-btn" onClick={onEdit} />

            <MdDelete className="delete-btn" onClick={onDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
