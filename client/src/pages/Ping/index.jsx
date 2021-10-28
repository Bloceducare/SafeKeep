import React from 'react'
import CustomSelect from '../../components/CustomSelect'
import { LastPingDiv, PingBtn, PingDiv, PingFreqBtn, PingFreqForm, PingTable, PingTableHeading, ColC, DataTableWrapper } from './style'
import { FaCheck} from "react-icons/fa";
import {Row } from 'react-bootstrap'

function Ping() {
    return (
        <div>
            <div>
           
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          </div>

              
          <PingDiv>
              <div>
                  ping now
              </div>
              
              <div>
                 <PingBtn>
                     Ping Now
                 </PingBtn>
              </div>
          </PingDiv>

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
