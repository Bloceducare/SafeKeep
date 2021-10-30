import styled from "styled-components";
import {Row, Col} from 'react-bootstrap'




export const PingFreqBtn = styled.button`
background:#2B5BCF;
color:white;
padding:0.4rem 1.8rem;
border:none;
border-radius:5px;
height:100%;
margin-left:2rem;
font-size:1.5rem;
`

export const PingFreqForm = styled.div`
display:flex;
margin:3rem auto;
align-items:center;
justify-content:space-between;
`

export const LastPingDiv  =styled.div`
border-radius:5px;
border:1px solid rgb(138, 138, 138);
background:#2928285a;
padding:0.8rem 2rem;

h2 {
font-size:1.2rem;
}
`

export const PingTable =styled(Row)`
text-align:center;
border-bottom:1px solid #8A8A8A;
margin:0.4rem 0 ;
`


export const PingTableHeading = styled(PingTable)`
border-top:1px solid #8A8A8A;
border-bottom:1px solid #8A8A8A;
margin:0.4rem 0 ;
font-size:0.9rem;
opacity:0.7;
`
export const ColC = styled(Col)`
margin:${props => props.noMargin ==='true' ? 0 : '0.4rem 0rem'};
`

