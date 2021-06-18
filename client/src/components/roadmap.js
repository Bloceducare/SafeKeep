import React from 'react';
import Carousel from 'react-elastic-carousel';
import ProgressBar from './progressBar';
import '../styles/roadmap.css';


const RoadMap =()=> {

    const breakPoints=[
        {width: 700, itemsToShow: 1},
        {width: 1000, itemsToShow: 3}
        
    ]

    return(
        <div className="roadmap">
            <div className="roadmap-bg"></div>
            <div className="roadmap-main">
                <h2>Road Map</h2>
            <div className="header-circles">
                
                <div className="circle circle1"><span>Q3</span> 2021</div> :
                <div className="circle circle2"><span>Q1</span> 2022</div> :
                <div className="circle circle3"><span>Q2</span> 2022</div> 
               
                

            </div>

            <ProgressBar done="20" className="progress-bar"/>
            <Carousel className="carousel" breakPoints={breakPoints}>
            
            <div className="roadmap-item">
                    <h3>May - December 2021</h3>
                    <p>
                    Full beta testing <br />

                    Full ERC-20 support<br />

                    Liquidity pool selection <br/>
                    Layer 2 implementation - Polygon <br/>
                    Support for BSC and DOT tokens <br/>
                    Mobile Implementation

                    </p>
                </div>

                <div className="roadmap-item">
                    <h3>Q1, 2022</h3>
                    <p>
                    Mainnet contract development <br />

                   
                    Mainnet contract audit <br />

                    Mainnet contract testing<br />
                    
                    </p>
                </div>

                <div className="roadmap-item">
                    <h3>Q2, 2022</h3>
                    <p>
                    Back-up distribution percentage<br />

                    Ping reminder notifications <br />
                    Social backup <br />
                    Support for other web3 wallets <br />
                    </p>
                </div>
                
            </Carousel>
            </div>

        </div>
    )
}

export default RoadMap;