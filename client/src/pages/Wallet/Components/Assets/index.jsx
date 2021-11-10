import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import {  AddBtn, AssetDiv, P } from './style';
import Plus from "../../../../assets/plus.png"


function Assets() {
    return (
        <Container>
        <AssetDiv>
             <Row>
                 <Col lg="5" md="5" sm="5" >
                         <P>Total Balance</P>
                         <h5>USD 20220.21</h5>
                 </Col>
                 <Col lg="5" md="5" sm="5">
                         <P>Available Balance</P>
                         <h5>USD 20220.21</h5>
                 </Col>
                 <Col lg="2" md="2" sm="2">
                     <AddBtn><Image src={Plus} fluid/></AddBtn>
                 </Col>
             </Row>
        </AssetDiv>
    </Container>
    )
}

export default Assets
