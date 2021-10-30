import styled from 'styled-components'


export const Div = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
background:green;
background:${props => props.src };
padding:3rem;
margin:${props => props.margin }
`

export const Btn = styled.button`
background:#2B5BCF;
color:white;
font-size:1.3rem;
padding:0.5rem 1.5rem;
border-radius:5px;
border:none;
`