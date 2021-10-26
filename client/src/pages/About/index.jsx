import React from 'react'
import SmallBtc from '../../assets/monero.svg'
import Safe from '../../assets/shield.png'
function About() {
    return (
        <div className='max-width-35' style ={{
            maxWidth:'50rem',
            margin:'auto'
        }}>
           
          <h1 className='text-center mw-50 mt-5 about-intro text-uppercase ' >What happens to your Cryptocurrencies when you die</h1>

         <section className="row container">
             <div className="col-lg-4"> <img src= {SmallBtc} alt='bitc' /></div>
             <div className="col-lg-4"> <img src= {SmallBtc} /></div>
             <div className="col-lg-4"> <img src= {SmallBtc} /></div>
         </section>

         <section className="row align-items-center my-5" >
             <div className="col-lg-6 img"> 
             <div className="d-flex align-items-center">
             <img src ={Safe} alt='connect'/>
             <p className='p-2 opacity-7' style ={{
                 fontSize:'0.9rem'
             }} >
             This is the question that brought about SafeKeep. What happens to you cryptocurrencies when you die? What happens to your cryptocurrencies if you lose your key or your hard drive crashes? You should not lose access to your hard earned and valuable cryptos just like that.
             </p>
             </div>
             
          </div>
             <div className="col-lg-6 img">
             <div className="d-flex align-items-center">
             <img src ={Safe} alt='connect'/>
             <p className='p-2 opacity-7'>
             With the SafeKeep Dapp, you can be rest assured that your crypto is not lost forever, no matter what happens.
             </p>

             </div>
             </div>
         </section>


         <section className='row'>
             <div className="col-lg-6">
                <div className="d-flex justify-content-center">
                     <div> Arrow </div>
                     <div> How do we ensure this you ask?, it's simple </div>
                </div>
                 <img src={Safe} alt='safe' />
                 <p>
                    When depositing money into your SafeKeep Wallet, you are also mandated to supply a backup address, preferrably but not limited to a hardware wallet or a paper wallet that can be kept from disasters such as fire or a flood
                 </p>
             </div>
             <div className="col-lg-6">

             <div className="d-flex">
                     <div> Arrow </div>
                     <div> 
                     How do I get my crypto sent to my backup address if/when I lose access?
                     </div>
                 </div>

                 <img src={Safe} alt='safe' />
                 <p>
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
        </div>
    )
}



export default About
