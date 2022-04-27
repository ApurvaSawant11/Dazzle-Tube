import React from "react";

const ConfirmModal = ({ showConfirmModal, setShowConfirmModal }) => {
  return (
    <div className="flex-row-center modal-container">
      <div className="confirm-modal m-auto border-1">
        <div className="text-md fw-700 p-1 width-100">Clear watch history?</div>
        <div className="p-1 pt-0p5 border-bottom-1 width-100">
          Your watch history will be cleared from all the devices
        </div>
        <div className="modal-action-buttons flex-row">
          <button
            className="plain-button secondary-text mr-1"
            onClick={() =>
              setShowConfirmModal({ ...showConfirmModal, status: false })
            }
          >
            Cancel
          </button>
          <button
            className="plain-button primary-text"
            onClick={() => setShowConfirmModal({ status: false, value: true })}
          >
            Clear Watch History
          </button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmModal };
