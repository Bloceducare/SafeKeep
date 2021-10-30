import React from 'react'
import { Input } from './style'

function CustomInput({onChange, placeholder}) {
    return (
        <Input  onChage = {onChange} placeholder = {placeholder} />
            
    )
}

export default CustomInput
