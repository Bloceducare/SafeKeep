import { MDBAnimation, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React from "react";
import { Container } from "react-bootstrap";
import { H1, Hr} from "./style";

const Roadmap = () => {
    return (
        <>
         <H1>RoadMap</H1>
        <Container className="roadmap-container">
        <div class="timeline-block timeline-block-right">
            <Hr />
            <div class="timeline-content">
            <MDBAnimation class="timeline-content" reveal type="fadeInRight" duration="3s">
                <h5>May - December, 2021</h5>
                <ul>
                    <li>Full beta testing</li>
                    <li>Liquidity pool selection</li>
                    <li>Full ERC20 support</li>
                    <li>Support for BSC and DOT coin</li>
                    <li>Layer 2 implementation-polygon</li>
                    <li>Mobile implementation</li>
                </ul>
            </MDBAnimation>
            </div>
            
        </div>

        <div class="timeline-block timeline-block-left">
            <Hr />
            <div class="timeline-content">
            <MDBAnimation class="timeline-content" reveal type="fadeInLeft" duration="3s">
                <h5>Q1 2022</h5>
                <ul>
                    <li>Mainnet contract development</li>
                    <li>Mainnet contract audit</li>
                    <li>Mainnet contract testing</li>
                </ul>
            </MDBAnimation>
            </div>
        </div>

        <div class="timeline-block timeline-block-right">
            <Hr />
            <div class="timeline-content">
            <MDBAnimation class="timeline-content" reveal type="fadeInRight" duration="3s">
            <h5>Q2 2022</h5>
                <ul>
                    <li>Back-up distribution percentage</li>
                    <li>Ping reminder notification</li>
                    <li>Social backup</li>
                    <li>Support for other web3 wallet</li>
                </ul>
            </MDBAnimation>
            </div>
        </div>
        </Container> 
        </>
    )
}

export default Roadmap

{/* <Section>
            <div className="transition-gradient-after adjust-top"></div>
            <Container>
            <div className="dots-vert"></div>
            <div className="section-heading text-center">
               <h2 className="h1-responsive font-weight-bold my-5">ROADMAP</h2>
               <Hr />
            </div>
            <MDBRow className="clearfix">
                <MDBCol lg="10">
                    <MDBContainer fluid>
                        <MDBRow className="clearfix left">
                            <MDBCol lg="4" className="box left first reveal">
                                <div className="dots pull-right"></div><br />
                                <h6>May-December 2021</h6>
                                <ul>
                                    <li>Full beta testing</li>
                                    <li>Liquidity pool selection</li>
                                    <li>Full ERC20 support</li>
                                    <li>Support for BSC and DOT coin</li>
                                    <li>Layer 2 implementation-polygon</li>
                                    <li>Mobile implementation</li>
                                </ul>
                            </MDBCol>
                            <MDBCol lg="2">
                                <div className="lines first">
                                <   div class="roadmap-line active"></div>
                                <   div class="roadmap-line"></div>
                                </div>
                            </MDBCol>
                            <MDBCol lg="4" className="box right first reveal">
                                <div className="dots pull-left">

                                </div>
                                <br/>
                                <h6>Phase 2</h6>
                                <ul>
                                    <li>Full beta testing</li>
                                    <li>Liquidity pool selection</li>
                                    <li>Full ERC20 support</li>
                                    <li>Support for BSC and DOT coin</li>
                                    <li>Layer 2 implementation-polygon</li>
                                    <li>Mobile implementation</li>
                                </ul>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            </Container>
        </Section> */}

    //     <Section>
    //     <div className="text-center">
    //         <h2 className="h1-responsive">ROADMAP</h2>
    //     </div>
    //     <MDBRow className="clearfix">
    //         <BoxLeft lg="6">
    //             <Container>
    //                <TextBox>
    //                     <p>May-December 2021 <Hr /></p>
    //                     <ul>
    //                         <li>Full beta testing</li>
    //                         <li>Liquidity pool selection</li>
    //                         <li>Full ERC20 support</li>
    //                         <li>Support for BSC and DOT coin</li>
    //                         <li>Layer 2 implementation-polygon</li>
    //                         <li>Mobile implementation</li>
    //                     </ul>
    //                </TextBox>
    //             </Container>
    //         </BoxLeft>
    //         <MDBCol lg="6">

    //         </MDBCol>
    //     </MDBRow>
    //     <MDBRow className="clearfix">
    //         <BoxLeft lg="6">
                
    //         </BoxLeft>
    //         <MDBCol lg="6">
    //         <Container>
    //                <TextBox>
    //                     <p>May-December 2021 <Hr /></p>
    //                     <ul>
    //                         <li>Full beta testing</li>
    //                         <li>Liquidity pool selection</li>
    //                         <li>Full ERC20 support</li>
    //                         <li>Support for BSC and DOT coin</li>
    //                         <li>Layer 2 implementation-polygon</li>
    //                         <li>Mobile implementation</li>
    //                     </ul>
    //                </TextBox>
    //             </Container>
    //         </MDBCol>
    //     </MDBRow>
    //     <MDBRow className="clearfix">
    //         <BoxLeft lg="6">
    //         <Container>
    //                <TextBox>
    //                     <p>May-December 2021 <Hr /></p>
    //                     <ul>
    //                         <li>Full beta testing</li>
    //                         <li>Liquidity pool selection</li>
    //                         <li>Full ERC20 support</li>
    //                         <li>Support for BSC and DOT coin</li>
    //                         <li>Layer 2 implementation-polygon</li>
    //                         <li>Mobile implementation</li>
    //                     </ul>
    //                </TextBox>
    //             </Container>
    //         </BoxLeft>
    //         <MDBCol lg="6">
            
    //         </MDBCol>
    //     </MDBRow>
    // </Section>