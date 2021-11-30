import Select from 'react-select';


const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isFocused ? 'black' : 'white',
    }),
    menu: () => ({
        maxHeight: '10rem',
        overflow: 'auto',
        position: 'absolute',
        top:'3rem',
        width: '100%',
        backgroundColor: '#333'
    })
 
  }

const TokenListSelect = ({handleChange, selected, data, labelDiv, ...others}) => {
    return (
        <>
            <Select 
            styles={customStyles}
            value={selected}
            options={data}
            onChange={handleChange}
            getOptionLabel = {labelDiv}
            {...others}
            
              />
        </>
    )
}

export default TokenListSelect