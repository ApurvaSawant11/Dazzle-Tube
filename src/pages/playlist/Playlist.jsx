import React, { useState } from "react";
import { PlaylistFolderCard, SaveModal } from "../../components";
import { useVideo } from "../../context";
import { useDocumentTitle } from "../../hooks";

const Playlist = () => {
  useDocumentTitle("Playlists");
  const { playlist } = useVideo();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="video-container">
      <div className="flex-row-center">
        <h5 className="text-center basis-full">Playlists</h5>

        <button
          className="button primary radius-0 mr-1"
          onClick={() => setShowModal(true)}
        >
          Create
        </button>
      </div>

      {playlist.length > 0 ? (
        <div className="video-grid">
          {playlist.map((list) => (
            <PlaylistFolderCard key={list._id} list={list} />
          ))}
        </div>
      ) : (
        <p className="text-lg px-1 text-center">
          Looks like you have not created a playlist yet.
        </p>
      )}

      {showModal && (
        <SaveModal
          showModal={showModal}
          setShowModal={setShowModal}
          fromPlaylistPage={true}
        />
      )}
    </div>
  );
};

export { Playlist };
