import React from 'react'
import Monero from '../../assets/monero.png'
import Btc from '../../assets/bitcoin.png'
import Eth from '../../assets/eth.png'
import Safe from '../../assets/shield.png'
import { FaArrowUp } from "react-icons/fa";


function About() {
    return (
        <div className='max-width-35' style ={{
            maxWidth:'50rem',
            margin:'auto',
            padding:'0 2rem'
        }}>
           
           <div className ='hero'>
          <h1 className='text-center mw-50 mt-5 about-intro text-uppercase ' >What happens to your Cryptocurrencies when you die</h1>

  
         <section className="row container">
             <div className="col-lg-4"> <img src= {Eth} alt='bitc' width={'100%'} className='about-us-eth' /></div>
             <div className="col-lg-4"> <img src= {Btc}  width={'100%'} className='about-us-btc' /></div>
             <div className="col-lg-4"> <img src= {Monero} width={'100%'} className='about-us-monero' /></div>
         </section>
         </div>

         <section className="row align-items-center my-5" >
             <div className="col-lg-6 img"> 
             <div className="d-flex align-items-center">
             <img src ={Safe} alt='connect' className ='shield-scale-down'/>
             <p className='p-2 opacity-7 fs-0-9' >
             This is the question that brought about SafeKeep. What happens to you cryptocurrencies when you die? What happens to your cryptocurrencies if you lose your key or your hard drive crashes? You should not lose access to your hard earned and valuable cryptos just like that.
             </p>
             </div>
             
          </div>
             <div className="col-lg-6 img">
             <div className="d-flex align-items-center">
             <img src ={Safe} alt='connect' className ='shield-scale-down'/>
             <p className='p-2 opacity-7 fs-0-9'>
             With the SafeKeep Dapp, you can be rest assured that your crypto is not lost forever, no matter what happens.
             </p>

             </div>
             </div>
         </section>


         <section className='row'>
             <div className="col-lg-6">
                <div className="d-flex justify-content-between align-items-center p-3">
                     <div>
                         <FaArrowUp  className='arrow-styles'
                        />
                    </div>
                     <div> How do we ensure this you ask?, it's simple </div>
                </div>
                
                <div className ='my-4 man-bg bg-about-img'>  </div>
               
                 <p className=' opacity-7 fs-0-9'>
                    When depositing money into your SafeKeep Wallet, you are also mandated to supply a backup address, preferrably but not limited to a hardware wallet or a paper wallet that can be kept from disasters such as fire or a flood
                 </p>
             </div>
             <div className="col-lg-6">

             <div className="d-flex justify-content-between align-items-center ">
                     <div>  <FaArrowUp  className='arrow-styles dmr-2' /> </div>
                     <div> 
                     How do I get my crypto sent to my backup address if/when I lose access?
                     </div>
                 </div>

                 <div className ='my-4 plug-bg bg-about-img'>  </div>
               
                 <p className=' opacity-7 fs-0-9'>
                    Once we notice that there is no transation on your account for 6 months from the date you performed your last transaction, then
                    we send all your crypto holdings with us to your backup wallet.
                    In a case where you don't want to perform any transactions for a
                    long time but want us to know you still have access to your
                    account, all you have to do is send a Ping from the Dapp.
                    Most importantly, you can choose to withdraw all your funds
                    any time you want
                 </p>

             </div>
         </section>

         <section>
         <div className='d-flex justify-content-center align-items-center my-3 '>
                <div>
                    <FaArrowUp  className='arrow-styles' />
                </div>
                <div className ='mx-3 my-4'>
                    How do I get started?
                </div>
             </div>

         <div className="row">
             <div className="col-lg-6 custom-ul dpl-3">
                 <span className='opacity-7 fs-0-9'>
                 We advise you use SafeKeep with Google Chrome browser and also download the MetaMask extensionhere and set it up (We'll add support for other wallets soon)
                     </span>        
             </div>
             
             <div className="col-lg-6 custom-ul dpl-3">
                 <span className='opacity-7 fs-0-9'>
                 Once that is done, Click on the Connect button on the Navbar or homepage to connect your MetaMask wallet to SafeKeep Dapp
                     </span>        
             </div>
         </div>


         <div className="row">
             <div className="col-lg-6 custom-ul dpl-3">
                 <span className='opacity-7 fs-0-9'>
                 You should see a balance of 0 ETH if this is your first time; All you have to do now is click on the Withdraw button to open the Withdraw Modal
                     </span>        
             </div>
             
             <div className="col-lg-6 custom-ul dpl-3">
                 <span className='opacity-7 fs-0-9'>
                 Enter the Amount you want to deposit and enter a valid backup address and then click on Deposit and wait for your transaction to be completed Hurray! if you got a success message, then you have officially become a SafeKeep User!.
                     </span>        
             </div>
         </div>
         </section>

         
        </div>
    )
}



export default About
