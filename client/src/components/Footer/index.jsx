
import { FootLogo, FooterDiv} from './style'
import Twitterlogo from "../../assets/Twitter.png";
import Telegramlogo from "../../assets/Telegram.png"

function Footer() {
    return (
        <FooterDiv>
           <a href="/"><FootLogo src={Twitterlogo} fluid/></a>
           <a href="/"><FootLogo src={Telegramlogo} fluid/></a>
           <p>&copy; SafeKeep Team, {new Date().getFullYear()}</p>
        </FooterDiv>
    )
}

export default Footer
