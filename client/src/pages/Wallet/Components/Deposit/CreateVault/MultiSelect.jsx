import Select from 'react-select';

const colourOptions = [
     { value: '0xd5635C148df889B6dd89Eaa90eE886f4E733130A', label: '0xd5635C148df889B6dd89Eaa90eE886f4E733130A' },
     { value: '0xd5635C148df889B6dd89Eaa90eE886f4E733130B', label: '0xd5635C148df889B6dd89Eaa90eE886f4E733130B' },
     { value: '0xd5635C148df889B6dd89Eaa90eE886f4E733130C', label: '0xd5635C148df889B6dd89Eaa90eE886f4E733130C' },
     { value: '0xd5635C148df889B6dd89Eaa90eE886f4E733130D', label: '0xd5635C148df889B6dd89Eaa90eE886f4E733130D' },
     { value: '0xd5635C148df889B6dd89Eaa90eE886f4E733130E', label: '0xd5635C148df889B6dd89Eaa90eE886f4E733130E' }
  ]


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      width:'100%',
      color:'black'
    
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      background:'rgba(33, 37, 41)',
    }),
    container: (provided, state) => ({
      ...provided,
      background:'y ellow',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      background:'rgba(33, 37, 41)',
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      background:'rgba(33, 37, 41)',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      background:'rgba(33, 37, 41)',
    }),
  } 


const Multi = ({ name, setChange, options =colourOptions, noMulti = false}) => (
  <Select
  styles={customStyles}
    isMulti = {noMulti}
    name={name}
    options={options}
    onChange={setChange}
   // onChange={setChange}
    />
);

export default Multi;

