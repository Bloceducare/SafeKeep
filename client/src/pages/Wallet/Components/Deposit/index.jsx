import React, {useState, useEffect} from 'react'
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
import {useMoralis} from 'react-moralis'



function Deposit() {

  // Moralis.Web3API.account.getTransactions({ chain: CHAIN_ID, address: user.get('ethAddress') })
  // .then(function (transactions) {
  //   // do something with transactions
  // })
  // .catch(function (error) {
  //   // catch any errors
  // })

  const { user, logout, CHAIN_ID, chain} = useMoralis();
  console.log('testing', chain, CHAIN_ID, user)

  const {assets} = useERC20Balance()
  const [currentAsset, setCurrentAsset] = useState({balance:0})
  const [filteredAssets, setFilteredAssets] = useState([])
  const  [show, setShow] = useState(false)
  const [amount, setAmount] = useState(0)
  const [exitSearch, setExitSearch] = useState(true)

    const handleClose = ()=>{
      setExitSearch(true)
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

    const handleFilter = (e)=>{
      setExitSearch(false)
      const typed = (e.target.value).toLowerCase()
    
     const filtered =  assets.filter(asset=>  {
       return (
        asset.name.toLowerCase().includes(typed)||
        asset.symbol.toLowerCase().includes(typed)
       )
       
     });

     setFilteredAssets(filtered)
    
    }

    useEffect(()=>{
      setFilteredAssets(assets)
    }, [assets])
    return (
        <>

        <Modal show={show} onHide={handleClose}>
                <ModalHeader title = 'Deposit Crypto' />
                <ModalBody>
                  <CustomInput onKeyUp = {handleFilter}   />

                  <ListOfToken selected = {handleSelected}  data = { exitSearch ? assets : filteredAssets || []} />
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
