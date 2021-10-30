import styled from 'styled-components'


export const Div = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
/* background:green; */
/* background-image: linear-gradient(120deg, #eaee44, #33d0ff); */
background:${props => props.src };
padding:3rem;
margin:${props => props.margin };


background: -webkit-linear-gradient(to left, #00004694, #00004692);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to left,  #00004694, #00004692); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`

export const Btn = styled.button`
background:#2B5BCF;
color:white;
font-size:1.3rem;
padding:0.5rem 1.5rem;
border-radius:5px;
border:none;
`