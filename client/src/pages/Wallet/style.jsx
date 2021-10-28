import styled from "styled-components";


export const BtnDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const DepositBtn = styled.button`
    padding: 8px 30px;
    background-color: #2B5BCF;
    margin: 20px 20px;
    outline: none;
    border: none;
    border-radius: 12px;
    color: #fff;
    transition: all 0.3s ease-out;

    &:hover{
        background-color: transparent;
        border: 0.4px solid #2B5BCF;
    }
`
export const WithdrawBtn = styled.button`
    padding: 8px 25px;
    margin: 20px 50px 20px 10px;
    color:#2B5BCF;
    border-radius: 12px;
    background-color: transparent;
    outline: none;
    border: 0.4px solid #2b5bcf;
    transition: all 0.3s ease-in;

    &:hover{
        background: #2B5BCF;
        color: #FFF;
    }
`

export const AddBtn = styled.button`
    background: transparent;
    outline: none;
    border: none;
    margin-top: 3px;
`
export const P = styled.p`
    padding: 0;
    margin: 0;
    font-size: 14px;
`
export const AssetDiv = styled.div`
   margin: 20px;
   padding: 20px 30px;
   background-color: #050913;
`