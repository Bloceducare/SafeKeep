import React from 'react'
import Eth from '../../../hooks/useData'
import {TokenImage, TokensWrapperDiv, TokenWrapper} from './style'
import { NoTokenImage } from '../NotokenImage'
import to18Decimal from '../../../../../utils/to18Decimal'
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
                {to18Decimal(balance)}
            </div>
        </TokenWrapper>
        </>
    )
}
function ListOfToken({data, selected}) {
 
    return (
        <TokensWrapperDiv>
             {
               data?.length> 0 ? data?.map((token, index)=>(
                     <React.Fragment key ={index}>
                         <Token 
                        name = {token?.name}
                        balance = {token?.balance}
                        symbol ={token?.symbol}
                        onGetAsset = { ()=> selected(token)}
                         />
                     </React.Fragment>
                 )) : 'Add a token to your wallet to Start Safekeeping'
             }
        </TokensWrapperDiv>
    )
}

export default ListOfToken
