import React from "react";
import "./searchBar.css";
import { SearchIcon } from "../../assets";

const SearchBar = () => {
  return (
    <div className="flex-row-center search-container">
      <SearchIcon size={24} className="icon search-icon" />
      <input type="text" placeholder="Search" className="search-input" />
      <div></div>
    </div>
  );
};

export { SearchBar };
