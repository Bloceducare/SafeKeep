import React from 'react'
import {Btn} from './style'

function CustomButton({text, onClick, size}) {
    return (
        <Btn onClick ={onClick} size ={size}>
            {text} 
        </Btn>
    )
}

export default CustomButton
