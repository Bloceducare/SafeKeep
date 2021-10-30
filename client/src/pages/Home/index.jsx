import React from 'react'
import {Image, Row} from "react-bootstrap"
import { BigText, BtnLeft,BtnRight, Container, Top, DivImg} from './style'
import {MDBAnimation} from "mdbreact";
import Lock from "../../assets/lock.png"

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
                    <MDBAnimation reveal type="fadeInRight" duration="3s">
                        <Image src={Lock} fluid/> 
                    </MDBAnimation>
                </DivImg>
                <div>
                    <p>Built on &nbsp;&nbsp;<Image src={`images/eth.png`}/></p>
                </div>
            </Container>
        </>
    )
}

export default Home
