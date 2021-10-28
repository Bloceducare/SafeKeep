import React from 'react'
import CustomSelect from '../../components/CustomSelect'
import { LastPingDiv, PingBtn, PingDiv, PingFreqBtn, PingFreqForm } from './style'
// BsCheckLg
import { FaCheck} from "react-icons/fa";

function Ping() {
    return (
        <div>
            <div>
            ping
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
