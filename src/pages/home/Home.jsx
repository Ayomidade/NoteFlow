import React, { useEffect, useState, useLayoutEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/cards/note/NoteCard";
import "../../styles/home.css";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import EmptyCard from "../../components/cards/empty-card/EmptyCard";
import noNotesImage from "../../assets/images/no-notes.svg";
import Delete from "../../components/cards/delete-card/Delete";
import Fetching from "../../components/pre-loader/fetching/Fetching";

// fetch notes from server
export const fetchNotes = async () => {
  try {
    const response = await axiosInstance.get("/notes");
    return response.data.notes;
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("token");
    }
    // console.error("Failed to fetch notes:", error);
  }
};

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });
  const [deleting, setDeleting] = useState(false);
  const [isReadingFull, setIsReadingFull] = useState(false);
  const [selectedFullNote, setSelectedFullNote] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [fetching, setFetching] = useState(false);

  const handleReadingFull = (note) => {
    setIsReadingFull(true);
    setSelectedFullNote(note);
  };

  // close modal
  const closeModal = () => {
    setOpenEditModal({ isShow: false, type: "add", data: null });
  };

  // fetch notes from server
  const handleFetchNotes = async () => {
    setFetching(true);
    try {
      const notesList = await fetchNotes();
      setNotes(notesList);
    } catch (error) {
      if (error.response && error.response?.status === 403) {
        // localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setFetching(false);
    }
  };

  // Time helper function
  // function timeAgo(date) {
  //   const now = new Date();
  //   const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

  //   if (secondsPast < 60) {
  //     return `${Math.floor(secondsPast)} seconds ago`;
  //   }
  //   if (secondsPast < 3600) {
  //     return `${Math.floor(secondsPast / 60)} minutes ago`;
  //   }
  //   if (secondsPast < 86400) {
  //     return `${Math.floor(secondsPast / 3600)} hours ago`;
  //   }
  //   if (secondsPast < 2592000) {
  //     return `${Math.floor(secondsPast / 86400)} days ago`;
  //   }
  //   if (secondsPast < 31104000) {
  //     return `${Math.floor(secondsPast / 2592000)} months ago`;
  //   }
  //   return `${Math.floor(secondsPast / 31104000)} years ago`;
  // }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user");
      const fullName =
        response.data.message.firstname + " " + response.data.message.lastname;
      setUserInfo(fullName);
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        // localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useLayoutEffect(() => {
    getUserInfo();
    handleFetchNotes();
  }, []);

  // Edit note handler
  const handleEditNote = (note) => {
    setOpenEditModal({ isShow: true, type: "edit", data: note });
  };

  const confirmDelete = (noteId) => {
    setDeleting(true);
    setDeletingId(noteId);
  };

  const cancelDelete = () => {
    setDeleting(false);
    setDeletingId(null);
  };

  // Delete note handler
  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/notes/${noteId}`);
      handleFetchNotes();
    } catch (error) {
      if (error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setDeleting(false);
    }
  };
  return (
    <>
      <Navbar userInfo={userInfo} />

      {fetching ? (
        <Fetching />
      ) : (
        <div className="container">
          {notes.length > 0 ? (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  date={note.updatedAt}
                  // tags={note._id}
                  isPinned={true}
                  onEdit={() => {
                    handleEditNote(note);
                  }}
                  onDelete={() => {
                    confirmDelete(note._id);
                  }}
                  onPinNote={() => {}}
                  setIsReadingFull={() => handleReadingFull(note)}
                />
              ))}
            </div>
          ) : (
            <EmptyCard
              imgSrc={noNotesImage}
              message={"No notes available. Create a new note!"}
            />
          )}

          {isReadingFull && selectedFullNote && (
            <div className="fullnote-overlay">
              <div className="fullnote-container">
                <h2>Full Note Content</h2>
                <h3 className="fullnote-title">{selectedFullNote.title}</h3>
                <p className="fullnote-content">{selectedFullNote.content}</p>
                <button
                  className="close-fullnote-btn"
                  onClick={() => {
                    setIsReadingFull(false);
                    setSelectedFullNote(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {deleting && (
            <Delete
              cancelDelete={cancelDelete}
              confirmDelete={() => deleteNote(deletingId)}
            />
          )}

          <button
            className="new-btn"
            onClick={() =>
              setOpenEditModal({ isShow: true, type: "add", data: null })
            }
          >
            <MdAdd className="new-note" />
          </button>

          <Modal
            isOpen={openEditModal.isShow}
            onRequestClose={closeModal}
            style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
            contentLabel=""
            className="note-modal"
          >
            <AddEditNote
              onClose={closeModal}
              onSuccess={handleFetchNotes}
              type={openEditModal.type}
              note={openEditModal.data}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Home;
