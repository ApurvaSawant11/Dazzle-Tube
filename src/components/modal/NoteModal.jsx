import React from "react";
import { CloseIcon } from "../../assets";

const NoteModal = ({ showNoteModal, setShowNoteModal }) => {
  return (
    <div
      className="flex-row-center modal-container"
      onClick={() => setShowNoteModal({ status: false, noteText: "" })}
    >
      <div
        className="confirm-modal m-auto border-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-md fw-700 p-1 width-100 flex-row-center justify-between">
          My Note
          <CloseIcon
            className="icon"
            onClick={() => setShowNoteModal({ status: false, noteText: "" })}
          />
        </div>
        <div className="p-1 pt-0p5 border-bottom-1 width-100 whitespace-prewrap">
          {showNoteModal.noteText}
        </div>
      </div>
    </div>
  );
};

export { NoteModal };
