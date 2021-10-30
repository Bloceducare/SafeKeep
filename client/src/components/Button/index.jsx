import React from 'react'
import {Btn} from './style'

function CustomButton({text, onClick, size, className}) {
    return (
        <Btn className ={className} onClick ={onClick} size ={size}>
            {text} 
        </Btn>
    )
}

export default CustomButton
