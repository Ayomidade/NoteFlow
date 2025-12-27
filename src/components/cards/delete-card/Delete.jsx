import React from "react";
import "./delete.css";

const Delete = ({ cancelDelete, confirmDelete }) => {
  return (
    <div className="delete-overlay">
      <div className="delete-card">
        <h2>Are you sure you want to delete this note?</h2>
        <div className="delete-actions">
          <button className="confirm-delete" onClick={confirmDelete}>
            Delete
          </button>
          <button className="cancel-delete" onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
