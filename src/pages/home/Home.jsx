import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/cards/note/NoteCard";
import "../../styles/home.css";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openEditModal, setOpenEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  // close modal
  const closeModal = () => {
    setOpenEditModal({ isShow: false, type: "add", data: null });
  };
  const [notes, setNotes] = useState([]);

  // fetch notes from server
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setNotes(response.data.notes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Time helper function
  function timeAgo(date) {
    const now = new Date();
    const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast < 86400) {
      return `${Math.floor(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast < 2592000) {
      return `${Math.floor(secondsPast / 86400)} days ago`;
    }
    if (secondsPast < 31104000) {
      return `${Math.floor(secondsPast / 2592000)} months ago`;
    }
    return `${Math.floor(secondsPast / 31104000)} years ago`;
  }

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.post("/user");

      console.log(response.data.message);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }),
    [];

  // Edit note handler
  const handleEditNOte = (note) => {
    setOpenEditModal({ isShow: true, type: "edit", data: note });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {notes ? (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                title={note.title}
                content={note.content}
                date={timeAgo(note.createdAt)}
                tags={note._id}
                isPinned={true}
                onEdit={() => {
                  handleEditNOte(note);
                }}
                onDelete={() => {}}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <p>No note found</p>
        )}
        {/* <NoteCard
            title={"Note title"}
            content={"A new note app content"}
            date={"15th Dec 2025"}
            tags={"#note"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          /> */}

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
          <AddEditNote onClose={closeModal} onSuccess={fetchNotes} />
        </Modal>
      </div>
    </>
  );
};

export default Home;
