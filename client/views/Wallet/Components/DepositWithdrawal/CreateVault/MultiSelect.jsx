//import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    width: "100%",
    color: "black",
  }),
  control: (provided, state) => {
    return {
      ...provided,
      border: state.isFocused ? "1px solid white" : "1px solid white",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? "1px solid white" : "1px solid white",
      },
    };
  },
  valueContainer: (provided, state) => ({
    ...provided,
    background: "rgba(33, 37, 41)",
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "white",
    background: "rgba(33, 37, 41)",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "white",
    background: "rgba(33, 37, 41)",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    color: "white",
    background: "rgba(33, 37, 41)",
  }),

  multiValueLabel: (provided, state) => {
    return {
      ...provided,
      background: "rgba(33, 37, 41)",
      color: "white",
      border: "1px solid #ffffff4f",
    };
  },

  multiValue: (provided, state) => {
    return {
      ...provided,
      background: "rgba(33, 37, 41)",
      color: "white",
    };
  },
  input: (provided, state) => {
    return {
      ...provided,
      color: "white",
    };
  },
};

const Multi = ({ name, setChange, options = [], noMulti = true }) => (
  <CreatableSelect
    placeholder="Inheritors"
    styles={customStyles}
    isMulti={noMulti}
    name={name}
    options={options}
    onChange={setChange}
    // onChange={setChange}
    noOptionsMessage={() =>
      `${
        options.length ? "Address not found" : "Type on input to create address"
      }`
    }
  />
);

export default Multi;
