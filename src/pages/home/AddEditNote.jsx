import React, { useState } from "react";
import "../../styles/edit.css";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/input/TagInput";
import axiosInstance from "../../utils/axios";

const AddEditNote = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddEditNote = async () => {
    setLoading(true);
    try {
      const noteData = { title, content, tags };
      // API CALL TO ADD/EDIT NOTE
      const response = await axiosInstance.post("/notes", noteData);
      if (response.data) {
        if (onSuccess) await onSuccess();
        onClose();
      }
    } catch (error) {
      console.log("Error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <MdClose className="close-edit-btn" onClick={onClose} />

        <div className="edit-title-container">
          <label className="input-label">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="edit-title-input"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="edit-content-container">
          <label className="input-label">Content</label>
          <textarea
            type="text"
            placeholder="Content"
            className="edit-content-input"
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        <div className="edit-tag-container">
          <label className="input-label">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        <button
          className="add-edit-btn"
          onClick={handleAddEditNote}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Add Note"}
        </button>
      </div>
    </>
  );
};

export default AddEditNote;
