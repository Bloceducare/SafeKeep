import React from 'react'
import CustomSelect from '../../components/CustomSelect'
import { LastPingDiv, PingBtn, PingDiv, PingFreqBtn, PingFreqForm, PingTable, PingTableHeading, ColC } from './style'
import { FaCheck, FaRegTimesCircle} from "react-icons/fa";
import DashboardHero from '../../components/DashboardHero';

function Ping() {
    return (
        <div>
            <div>

            

          <FaRegTimesCircle 
      
     
              />
           
          <p>
           
           
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          </div>

            <DashboardHero 
            btntext = 'Ping'
            text='Ping Now'
            margin= '3rem auto'
             />   

          <LastPingDiv>
              <h2>Last Ping</h2>
              <PingTableHeading header='true'>
              <ColC noMargin ='true'>Date</ColC>
              <ColC noMargin ='true'>Time</ColC>     
            </PingTableHeading>
              <PingTable> 
               <ColC>Sunday, 10th October 2021 </ColC>
                <ColC textRight ='right' isEmpty = 'none'>2021 </ColC>    
              </PingTable>
              <PingTable> 
               <ColC>Sunday, 10th October 2021 </ColC>
                <ColC textRight ='right' isEmpty = 'none'>2021 </ColC>    
              </PingTable>
          </LastPingDiv>

            <form>
            <PingFreqForm>
          <CustomSelect />
          <PingFreqBtn >
              <FaCheck />
          </PingFreqBtn>
          </PingFreqForm>
          </form>
        </div>
    )
}

export default Ping
