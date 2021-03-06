import { FaSearch } from "react-icons/fa";
import { HasSearch } from "./style";

function CustomSearchInput({ ...others }) {
  return (
    <HasSearch>
      <span>
        <FaSearch />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        {...others}
      />
    </HasSearch>
  );
}

export default CustomSearchInput;
