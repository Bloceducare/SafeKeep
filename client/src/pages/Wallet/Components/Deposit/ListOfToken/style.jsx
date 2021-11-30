import styled from "styled-components";
import {Image} from 'react-bootstrap'
import SpaceBetween from "../../../../../components/Layout/SpaceBetween";


export const TokenImage = styled(Image)`
width:2rem;
margin-right:0.4rem;
`


export const TokenWrapper = styled(SpaceBetween)`
/* border:1px solid green; */
padding: 0.5rem;
margin-top: 1rem;
margin-bottom: 1rem;

&:hover {
    cursor: pointer;
    opacity:0.7;
    outline:1px solid #ffffff3d;
}
`

export const TokensWrapperDiv = styled.div`
display:${props => props.display ? 'block' : 'none'};
margin-top:2rem;
max-height:20rem;
overflow-y:scroll;
width:100%;
position:absolute;
top:1.8rem;
background-color:#333;
z-index:1;
`