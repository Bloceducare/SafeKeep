import React from 'react'
import { Image } from 'react-bootstrap'
import { FootLogo, FooterDiv} from './style'

function Footer() {
    return (
        <FooterDiv>
           <a href="/"><FootLogo src={`images/Twitter.png`} fluid/></a>
           <a href="/"><FootLogo src={`images/Telegram.png`} fluid/></a>
           <p>&copy; SafeKeep Team, 2021</p>
        </FooterDiv>
    )
}

export default Footer
