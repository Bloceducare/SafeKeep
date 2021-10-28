import styled from "styled-components";

// export const Container = styled.div`
//     text-align: center;
// `

export const iconStyle ={
    color:'#2B5BCF'
}
export const DashboardWrapper = styled.div`
display:flex;
`

export const TopSection = styled.div`
`

export const BalanceDiv = styled.div`
background:#2B5BCF;
padding:0.3rem;
display:inline-block;
margin:0.4rem auto;

& span {
    text-align:center;
    font-size:0.7rem;   
}

& > div {
    font-weight:bold;
    font-size:0.8rem;
}
`

export const BottomSection = styled.div`
align-self: flex-end;
`
export const DashboardSection =styled.div`
flex:1;
padding-left:3rem;
background:#0B0D2E;

`
export const OtherDashboardSection = styled.div`
flex:4;
border:1px solid red;
background:#101010;
`

export const OtherSectionWrapper =styled.div`
margin:auto;
padding:3rem;
`
export const otherSectionContent =styled.div`

`

export const Header =styled.p`
font-size:1.5rem;
font-weight:bold;

`


export const List =styled.ul`
margin:0;
padding:0;
    & li {
align-items:center;
list-style:none;
margin:2rem 0;
}
`

