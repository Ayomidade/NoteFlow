import React, { useState } from "react";
import "../../styles/edit.css";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/input/TagInput";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";

const AddEditNote = ({ onClose, onSuccess, note, type }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const params = useParams();
  const addNote = async () => {
    setLoading(true);
    try {
      const noteData = { title, content };
      // API CALL TO ADD
      const response = await axiosInstance.post("/notes", noteData);
      if (response.data) {
        if (onSuccess) await onSuccess();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to add new note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const editNote = async () => {
    setLoading(true);
    const noteId = note._id;
    try {
      const noteData = { title, content };
      // API TO EDIT NOTE
      const response = await axiosInstance.patch(`/notes/${noteId}`, noteData);
      if (response.data) {
        if (onSuccess) await onSuccess();
        onClose();
      }
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to edit the note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
    // console.log(noteId);
  };

  const handleNote = () => {
    if (!title) {
      setError("Title is required");
    }
    if (!content) {
      setError("Content is required");
    }

    if (type === "edit") {
      editNote();
    } else {
      addNote();
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

        {/* <div className="edit-tag-container">
          <label className="input-label">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div> */}

        {error && <p className="auth-error">{error}</p>}

        <button
          className="add-edit-btn"
          onClick={handleNote}
          disabled={loading}
        >
          {/* {loading ? "Please wait..." : "Add Note"} */}
          {type === "edit"
            ? loading
              ? "Please wait..."
              : "Update Note"
            : loading
            ? "Please wait..."
            : "Add Note"}
        </button>
      </div>
    </>
  );
};

export default AddEditNote;
