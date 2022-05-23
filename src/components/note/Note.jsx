import React, { useState } from "react";
import "./note.css";
import { useVideo, useToast } from "../../context";
import { TrashIcon, EditIcon } from "../../assets";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { NoteModal } from "../modal/NoteModal";

const Note = ({ video, token }) => {
  const { videos, dispatch } = useVideo();
  const [newNote, setNewNote] = useState("");
  const [isEditNote, setIsEditNote] = useState({ status: false, noteId: null });
  const { watchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { displayToast } = useToast();
  const [showNoteModal, setShowNoteModal] = useState({
    status: false,
    noteText: "",
  });

  const addNoteHandler = () => {
    if (newNote.trim() !== "") {
      const noteDetails = {
        _id: uuid(),
        note: newNote,
      };
      dispatch({
        type: "ADD_NOTES",
        payload: { watchId, noteDetails },
      });
      setNewNote("");
    } else {
      displayToast({
        toastType: "error",
        toastMessage: "Please enter valid input",
      });
    }
  };

  const editNoteHandler = () => {
    if (newNote.trim() !== "") {
      const updatedNote = video.notes.map((videoNote) =>
        videoNote._id === isEditNote.noteId
          ? { ...videoNote, note: newNote }
          : { ...videoNote }
      );
      const updatedVideos = videos.map((video) =>
        video._id === watchId ? { ...video, notes: updatedNote } : { ...video }
      );
      dispatch({
        type: "SET_NOTES",
        payload: updatedVideos,
      });
      setNewNote("");
      setIsEditNote({ status: false, noteId: null });
    } else {
      displayToast({
        toastType: "error",
        toastMessage: "Please enter valid input",
      });
    }
  };

  const deleteNoteHandler = (_id) => {
    const updatedNote = video.notes.filter((note) => note._id !== _id);
    const updatedVideos = videos.map((video) =>
      video._id === watchId ? { ...video, notes: updatedNote } : { ...video }
    );
    dispatch({
      type: "SET_NOTES",
      payload: updatedVideos,
    });
  };

  return (
    <div className="notes-container">
      <div>
        <textarea
          type="text"
          placeholder="Add a note..."
          className="input note-textarea border-1"
          required
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onClick={() =>
            !token &&
            navigate("/login", { state: { from: location } }, { replace: true })
          }
        />
        {isEditNote.status ? (
          <div className="flex-row-center gap-0p5">
            <button
              className="button primary width-100 radius-0 add-note-btn my-1"
              onClick={editNoteHandler}
            >
              Edit Note
            </button>
            <button
              className="button secondary width-100 radius-0 add-note-btn my-1"
              onClick={() => {
                setNewNote("");
                setIsEditNote({ status: false, noteId: "" });
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="button primary width-100 radius-0 add-note-btn my-1"
            onClick={addNoteHandler}
          >
            Add Note
          </button>
        )}
      </div>

      {/* Display notes */}
      <div className="notes-list mt-1p5">
        {video.notes?.map(({ _id, note }) => (
          <div
            className="note-wrapper border-1 p-1 mb-1"
            key={_id}
            style={{ whiteSpace: "pre-wrap" }}
          >
            <div className="note-action-icons">
              <span className="note-icon">
                <EditIcon
                  size={19}
                  onClick={() => {
                    setNewNote(note);
                    setIsEditNote({ status: true, noteId: _id });
                  }}
                />
              </span>
              <span className="note-icon  ml-0p5">
                <TrashIcon onClick={() => deleteNoteHandler(_id)} />
              </span>
            </div>
            <div
              className="note cursor-pointer"
              onClick={() => setShowNoteModal({ status: true, noteText: note })}
            >
              {note}
            </div>
          </div>
        ))}
      </div>
      {showNoteModal.status && (
        <NoteModal
          showNoteModal={showNoteModal}
          setShowNoteModal={setShowNoteModal}
        />
      )}
    </div>
  );
};

export { Note };
