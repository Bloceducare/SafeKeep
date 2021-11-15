import React from 'react'
import { Input } from './style'

function CustomInput({onChange, placeholder, ...others}) {
    return (
        <Input  onChage = {onChange} placeholder = {placeholder} {...others} />
            
    )
}

export default CustomInput
