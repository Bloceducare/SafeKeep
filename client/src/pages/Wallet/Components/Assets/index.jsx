import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import CreateVaultModal from '../Deposit/CreateVault';
import {  AddBtn, AssetDiv, P } from './style';
import {showCreateVaultModal} from '../../../../state/ui'
import NoVault from '../NoVault';
import {vault} from '../../selectors'


function Assets() {
    const dispatch = useDispatch()
    const {data, loading} = useSelector(vault)

    const handleShowModal = ()=> dispatch(showCreateVaultModal())

    const _noVault = <>
       <Row>
                 <Col lg="5" md="5" sm="5" >
                         <P>Total Balance</P>
                         <h5>USD 0.0000</h5>
                 </Col>
                 <Col lg="5" md="5" sm="5">
                         <P>Available Balance</P>
                         <h5>USD 0.0000</h5>
                 </Col>
                 <Col lg="2" md="2" sm="2">
                     <AddBtn onClick= {handleShowModal}> + </AddBtn>
                 </Col>
             </Row>
    
    <NoVault onClick ={ handleShowModal}/> </>

    const _data = <>
         <Row>
                 <Col lg="5" md="5" sm="5" >
                         <P>Total Balance</P>
                         <h5>USD 0.0000</h5>
                 </Col>
                 <Col lg="5" md="5" sm="5">
                         <P>Available Balance</P>
                         <h5>USD 0.0000</h5>
                 </Col>
                 <Col lg="2" md="2" sm="2">
                     {/* <AddBtn onClick= {handleShowModal}> + </AddBtn> */}
                 </Col>
             </Row>
        </>
    return (
        <Container>
            <CreateVaultModal />
        <AssetDiv>
            {loading ?
            <P>Loading...</P> :
             ( data.id === '0') ? 
             _noVault: _data 
            }
        
        </AssetDiv>
            {/* <NoVault onClick ={ handleShowModal}/> */}    
    </Container>
    )
}

export default Assets
