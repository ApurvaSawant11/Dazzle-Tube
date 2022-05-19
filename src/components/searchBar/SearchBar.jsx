import React, { useState, useEffect } from "react";
import "./searchBar.css";
import { SearchIcon } from "../../assets";
import { useVideo } from "../../context";

const SearchBar = () => {
  const { dispatch } = useVideo();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch({
      type: "SEARCH",
      payload: searchInput,
    });
  }, [searchInput]);

  return (
    <div className="flex-row-center search-container">
      <SearchIcon size={24} className="icon search-icon" />
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export { SearchBar };
