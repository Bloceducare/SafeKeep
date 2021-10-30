
import { FootLogo, FooterDiv} from './style'

function Footer() {
    return (
        <FooterDiv>
           <a href="/"><FootLogo src={`images/Twitter.png`} fluid/></a>
           <a href="/"><FootLogo src={`images/Telegram.png`} fluid/></a>
           <p>&copy; SafeKeep Team, {new Date().getFullYear()}</p>
        </FooterDiv>
    )
}

export default Footer
