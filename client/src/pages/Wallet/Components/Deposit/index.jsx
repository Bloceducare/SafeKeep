import { current } from '@reduxjs/toolkit'
import React, {useState} from 'react'
import { useEffect } from 'react'
import {Modal} from 'react-bootstrap'
import CustomButton from '../../../../components/Button'
import CustomInput from '../../../../components/CustomInput'
import SpaceBetween from '../../../../components/Layout/SpaceBetween'
import ModalBody from '../../../../components/Modal/ModalBody'
import  ModalHeader from '../../../../components/Modal/ModalHeader'
import { useERC20Balance } from '../../../../hooks/useERC20Balance'
import isEmpty from '../../../../utils/isEmpty'
import to18Decimal from '../../../../utils/to18Decimal'
import ListOfToken from './ListOfToken'
import { NoTokenImage } from './NotokenImage'
import { DepositBtn, Balance, DepositDiv, DepositWrapper, Input, SelectToken, ArrowDown } from './style'



function Deposit() {
  const {assets} = useERC20Balance()
  const [currentAsset, setCurrentAsset] = useState({balance:0})
  const  [show, setShow] = useState(false)
  const [amount, setAmount] = useState(0)

    const handleClose = ()=>{
     return setShow(false)

    }

    const handleOpen = ()=>{
      setShow(true)
    }

    const handleSelected = (token)=>{
      setCurrentAsset(token)
      setAmount(0)
     return setShow(false)
    }

    const handleChange = (e)=>{
     return setAmount(e.target?.value)
    }
    
    const setMax = ()=>{
     const amt = (to18Decimal(currentAsset?.balance))
    return setAmount(Number(amt))
    }
    const  _image = isEmpty(currentAsset?.logo) ? <NoTokenImage /> : ``
    return (
        <>

        <Modal show={show} onHide={handleClose}>
                <ModalHeader title = 'Deposit Crypto' />
                <ModalBody>
                  <CustomInput />

                  <ListOfToken selected = {handleSelected}  data = {assets || []} />
                </ModalBody>   
        </Modal>

            <section>
            <DepositWrapper>
              <SpaceBetween >
                <div> 
             Deposit

                </div>
                <div> 
settings
                </div>
              </SpaceBetween>

              <DepositDiv >
                <div> 
             <div>

                  <SelectToken onClick= {handleOpen}>
                    <div>
                     {_image}
                    </div>
                    <div className ='token-name'>
                     {currentAsset?.name ? currentAsset?.symbol : 'Choose...'}
                    </div>
                    <div>
                   <ArrowDown />
                    </div>
                  </SelectToken>
              

               <Balance>
               Balance:  <span>{to18Decimal(currentAsset?.balance, 'decorate')}</span>
               </Balance>
               </div>

                </div>
                <div> 
                  <div className ='d-flex'>
                <Input defaultValue = {0} 
                onChange = {handleChange}
                value ={amount}
                type ='number'
                disabled = {!currentAsset?.name}
     
                />
                < CustomButton style={{
                  marginLeft:'0.6rem'
                }}
                 text = 'Max' 
                 noMargin className
                  ='p-1 px-3 bordered'
                  onClick={ setMax}
                  />
                </div>
                <div>
                <p className="text-right"> ~$ 4,258.93</p>
                  </div>
                </div>
              </DepositDiv>

                <DepositBtn>
                <CustomButton 
                className ='d-block'  
                noMargin text = 'Deposit'
               
                />
                </DepositBtn>
              
            </DepositWrapper>
            </section>
        </>
    )
}

export default Deposit
