import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify'
import { showCreateVaultModal } from "../../state/ui";
import { vault, ping } from './selector'
import CustomSelect from "../../components/CustomSelect";
import {
  LastPingDiv,
  PingFreqBtn,
  PingFreqForm,
  PingTable,
  PingTableHeading,
  ColC,
} from "./style";
import { FaCheck } from "react-icons/fa";
import DashboardHero from "../../components/DashboardHero";
import { pingVaultAsync } from "./state";
import PingModal from "./components/PingModal";




function Ping() {
  const dispatch = useDispatch()
  const { data: { id } } = useSelector(vault)
  const { crud } = useSelector(ping)

  const handleShowModal = () => {
    if (id === '0') return dispatch(showCreateVaultModal())
    return dispatch(pingVaultAsync(id))

  }
  return (
    <div>
      <ToastContainer />
      <PingModal />
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>

      <DashboardHero
        clickshow={handleShowModal}
        btntext='Ping'
        text="Ping Now"
        margin="3rem auto"
        crud={crud}
      />

      <LastPingDiv>
        <h2>Last Ping</h2>
        <PingTableHeading header="true">
          <ColC noMargin="true">Date</ColC>
          <ColC noMargin="true">Time</ColC>
        </PingTableHeading>
        <PingTable>
          <ColC>Sunday, 10th October 2021 </ColC>
          <ColC textRight="right" isEmpty="none">
            2021{" "}
          </ColC>
        </PingTable>
        <PingTable>
          <ColC>Sunday, 10th October 2021 </ColC>
          <ColC textRight="right" isEmpty="none">
            2021{" "}
          </ColC>
        </PingTable>
      </LastPingDiv>

      <form>
        <PingFreqForm>
          <CustomSelect />
          <PingFreqBtn>
            <FaCheck />
          </PingFreqBtn>
        </PingFreqForm>
      </form>
    </div>
  );
}

export default Ping;
