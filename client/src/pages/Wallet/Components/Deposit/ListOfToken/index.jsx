import React from 'react'
import {TokenImage, TokensWrapperDiv, TokenWrapper} from './style'
import { NoTokenImage } from '../NotokenImage'
import isEmpty from '../../../../../utils/isEmpty'



const Token  =({name, balance, symbol, logo, onGetAsset})=>{
    const _image = isEmpty(logo) ? <NoTokenImage />: <TokenImage  src = {`${logo}`} fluid />

    return (
        <>
        <TokenWrapper onClick ={onGetAsset} >   
            <div>
                    <div className ='d-flex align-items-center'>
                       {_image}
                        <div>
                           
                            {symbol}
                           <br />
                            <span className ='text-muted'> {name}</span>
                        </div>
                    </div>
            </div>

            <div>
                {balance}
                {/* {to18Decimal(balance)} */}
            </div>
        </TokenWrapper>
        </>
    )
}
function ListOfToken({data, selected, display}) {
    const bal = (token)=>{
      const p =  token?.balance / Math.pow(10, token?.decimals)

        return p?.toFixed(4);
    }
 
    return (
        <TokensWrapperDiv display = {display}>
             {
               data?.length> 0 ? data?.map((token, index)=> {
                   return (
                    <React.Fragment key ={index}>
                    <Token 
                   name = {token?.name}
                   balance = {(bal(token))}
                   symbol ={token?.symbol}
                   onGetAsset = { ()=> selected(token)}
                    />
                </React.Fragment>
                   )
               }
                     
                 ) : 'Add a token to your wallet to Start Safekeeping'
             }
        </TokensWrapperDiv>
    )
}

export default ListOfToken
