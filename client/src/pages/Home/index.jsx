import React from 'react'
import {Image, Row} from "react-bootstrap"
import { BigText, BtnLeft,BtnRight, Container, Top, DivImg} from './style'

function Home() {
    return (
        <>
            <Container>
                <Top>
                    <BigText>SAFEKEEP</BigText>
                    <h5>Provide guaranteed storage</h5>
                    <h5>and safety backup for crypto assets</h5>
                    <div>
                        <BtnLeft>Connect</BtnLeft>
                        <BtnRight>Lite Paper</BtnRight>
                    </div>
                </Top>
                <DivImg className="container-fluid">
                    <Image src={`images/lock.png`} fluid/>
                </DivImg>
                <div>
                    <p>Built on &nbsp;&nbsp;<Image src={`images/eth.png`}/></p>
                </div>
            </Container>
        </>
    )
}

export default Home
