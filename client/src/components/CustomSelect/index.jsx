import React, {Fragment} from 'react'
import {Select} from './style'


const defaultVal = [
  {value :'ok', txt : 'js'},
  {value :'none', txt :'css'},
  {value :'rst', txt :'react'}
]
function CustomSelect({change, optionsArray = defaultVal, title = 'Select an Option'}) {
    return (
      <>
<Select onChange ={change}>
  <select>
    <option selected disabled >{title}</option>
    {
      optionsArray.map((item, index)=>(
        <Fragment key = {index}>
          <option value={item?.value}>{item?.txt}</option>
        </Fragment>
      ))
    }
</select>
</Select>
</>



    )
}

export default CustomSelect
