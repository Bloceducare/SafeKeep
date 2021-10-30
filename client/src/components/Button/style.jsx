import styled, {css} from 'styled-components'


const determineSize = ()=>{}


const smallsize = `
padding:0.2rem 0.8rem;
font-size:1rem;
`

const largesize = `
margin-left:2rem;
font-size:1.5rem;
`

export const Btn = styled.button`
background:#2B5BCF;
color:white;
padding:0.4rem 1.8rem;
border:none;
border-radius:5px;
height:100%;
${props => props.size ==='small' ? css`${smallsize}` : css`${largesize}`}
`