import React from "react";
import { FaSearch } from "react-icons/fa";
import { HasSearch } from "./style";

function CustomSearchInput() {
  return (
    <HasSearch>
      <span>
        <FaSearch />
      </span>
      <input type="text" class="form-control" placeholder="Search" />
    </HasSearch>
  );
}

export default CustomSearchInput;
