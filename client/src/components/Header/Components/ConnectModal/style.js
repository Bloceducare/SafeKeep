import styled from "styled-components";

// export const Wallet = styled.div`
//     color:black;
//     text-align:center;
//     padding:0.3rem;
//     padding-top:0.9rem;

//     &:hover {
//         background:gray;
//         cursor:pointer;
//     }
//     &:focus {
//         cursor:pointer;
//     }

// `


export const Wallet =styled.div`
display:flex;
justify-content:space-between;
align-items:center
color:black;
background:#8080806b;
width:100%;
padding:0.4rem;
border-radius:5px;
margin:1rem auto;
    &:hover {
        outline:1px solid red;
        cursor:pointer;
    }
    &:focus {
        cursor:pointer;
    }
h5{
    margin:0;
    color:black;
}

div {
    padding:0;
}

img {
    border:green;
}

`