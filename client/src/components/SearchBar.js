import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ handleSearch }) => {
  return (
    <TextField
      fullWidth
      label="Search for recipe name"
      onChange={(e) => handleSearch(e.target.value)}
      style={{ marginTop: "20px" }}
    />
  );
};

export default SearchBar;
