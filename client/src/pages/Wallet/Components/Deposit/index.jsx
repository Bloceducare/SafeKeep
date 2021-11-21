import React, {useState, useEffect, useMemo} from 'react'
import {Modal} from 'react-bootstrap'
import CustomButton from '../../../../components/Button'
import CustomInput from '../../../../components/CustomInput'
import SpaceBetween from '../../../../components/Layout/SpaceBetween'
import ModalBody from '../../../../components/Modal/ModalBody'
import  ModalHeader from '../../../../components/Modal/ModalHeader'
import { useERC20Balance } from '../../../../hooks/useERC20Balance'
import isEmpty from '../../../../utils/isEmpty'
import ListOfToken from './ListOfToken'
import { NoTokenImage } from './NotokenImage'
import { DepositBtn, Balance, DepositDiv, DepositWrapper, Input, SelectToken, ArrowDown } from './style'
import {useMoralisDapp} from '../../../../Providers/MoralisProvider/DappProvider'
import { useNativeBalance } from '../../../../hooks/useNativeBalance'
import { useMoralisWeb3Api} from 'react-moralis'

const nativeToken = (data)=>{

  const {nativeName, decimal=18, balance} = data

  if(nativeName?.toLowerCase() ==='bnb') return {
    balance:balance?.inWei,
    decimals:Number(decimal) ?? 18,
    name:nativeName,
    token_address:'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    logo:null,
    symbol:'BNB'
  }
  if (nativeName.toLowerCase() ==='eth') return {
    balance:balance?.inWei,
    decimals:Number(decimal) ?? 18,
    name:nativeName,
    token_address:'',
    logo:null,
    symbol:'Eth'
  }
  if(nativeName.toLowerCase() ==='matic') return {
    balance:balance?.inWei,
    decimals:Number(decimal) ?? 18,
    name:nativeName,
    token_address:'',
    logo:null,
    symbol:'matic'
  }
  if(nativeName.toLowerCase() ==='') return ''
  return;
}

function Deposit() {
  const { token } = useMoralisWeb3Api();

  const {chainId} =  useMoralisDapp()

  const [currentAsset, setCurrentAsset] = useState({balance:0, price:0, decimals:0, name:'', symbol:'', logo:null, token_address:''})

  const [userAssets, setUserAssets] = useState([])

  const {assets = []} = useERC20Balance()

  const [filteredAssets, setFilteredAssets] = useState([])

  const  [show, setShow] = useState(false)

  const [amount, setAmount] = useState(0)

  const [exitSearch, setExitSearch] = useState(true)

  const [fetchAsset, setFetchAsset] = useState(false)

  const native = useNativeBalance()
  
  
    const handleClose = ()=>{
      setExitSearch(true)
     return setShow(false)

    }

    const handleOpen = ()=>{
      setShow(true)
    }

    const handleSelected = async (tok)=>{
      setCurrentAsset(tok)
      setAmount(0)
      setFetchAsset(!fetchAsset)
     return setShow(false)
    }


    const handleChange = (e)=>{
     return setAmount(e.target?.value)
    }

    const fetchTokenPrice = async (tok) => {
      if(!tok) return;
      return await token
        .getTokenPrice({ chain:chainId, address:tok.token_address})
        .then((result) => {
          return setCurrentAsset({...currentAsset, price:result?.usdPrice})
        })
        .catch((e) =>{});
    };

    const setMax = ()=>{
     return setAmount(currentAsset?.balance)
    }

    const  _image = isEmpty(currentAsset?.logo) ? <NoTokenImage /> : ``

    const handleFilter = (e)=>{
      setExitSearch(false)
      const typed = (e.target.value)?.toLowerCase()
    
     const filtered =  userAssets.filter(asset=>  {
       return (
        asset?.name?.toLowerCase().includes(typed)||
        asset?.symbol?.toLowerCase().includes(typed)
       )
       
     });
     setFilteredAssets(filtered)
    }

    

    const memoizedAssets = useMemo(()=>assets, [assets])


    useEffect(()=>{
      setUserAssets([nativeToken(native),  ...assets])
  
    }, [memoizedAssets])

    useEffect(()=>{
      let cancel = false
      if(cancel) return;
      fetchTokenPrice(currentAsset)

      return ()=>{
        cancel = true
      }
    },[fetchAsset])



    const tokenValue = (Number(currentAsset?.balance))/Math.pow(10, currentAsset?.decimals)*currentAsset?.price
    const bal = currentAsset?.balance / Math.pow(10, currentAsset?.decimals)

    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <ModalHeader title = 'Deposit Crypto' />
                <ModalBody>
                  <CustomInput onKeyUp = {handleFilter} />
                  <ListOfToken selected = {handleSelected}  data = { exitSearch ? userAssets : filteredAssets || []} />
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
               Balance:  <span>
                 {bal.toFixed(4)}
               
                 </span>
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
                <p className="text-right"> ~$ { tokenValue ? tokenValue.toFixed(4) : 0 }</p>
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
