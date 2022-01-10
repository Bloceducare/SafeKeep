import { useEffect, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { showCreateVaultModal } from "../../state/ui";
import { vault, ping } from "./selector";
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
import { getPingsAsync, pingVaultAsync } from "./state";
import PingModal from "./components/PingModal";
import { getDate } from "../../utils/formatter";
import CustomButton from "../../components/Button";

function Ping() {
  const dispatch = useDispatch();
  const {
    data: { id },
  } = useSelector(vault);
  const { crud, data, loading, status } = useSelector(ping);

  const handleShowModal = () => {
    if (!id) return dispatch(showCreateVaultModal());
    return dispatch(pingVaultAsync(id));
  };

  const handlePings = useCallback(() => {
    dispatch(getPingsAsync());
  }, [dispatch]);
  useEffect(() => {
    handlePings();
  }, [handlePings]);

  const _noData = status === "success" && data?.length === 0 && "No Pings yet";
  // console.log(data, 'data')
  const _data = status === "success" && data?.length > 0 && (
    <>
      <LastPingDiv>
        <h2>Last Ping</h2>
        <PingTableHeading header="true">
          <ColC noMargin="true">Date</ColC>
          <ColC noMargin="true">Time</ColC>
        </PingTableHeading>
        {data.map((item) => (
          <Fragment key={item.time}>
            <PingTable>
              <ColC> {getDate(item.time)?.date} </ColC>
              <ColC textRight="right" isEmpty="none">
                {getDate(item.time)?.time}
              </ColC>
            </PingTable>
          </Fragment>
        ))}
      </LastPingDiv>

      <form>
        <PingFreqForm>
          <CustomSelect />
          <PingFreqBtn>
            <FaCheck />
          </PingFreqBtn>
        </PingFreqForm>
      </form>
    </>
  );

  const _error = status === "rejected" && !loading && (
    <>
      Error Loading your pings{" "}
      <CustomButton text="try again" onClick={handlePings} />{" "}
    </>
  );
  const _loading = status === "pending" && "Loading Pings";
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
        btntext="Ping"
        text="Ping Now"
        margin="3rem auto"
        crud={crud}
      />
      {!id && status === "fulfilled" ? (
        "Please create a vault first"
      ) : (
        <Fragment>{_data}</Fragment>
      )}
      {_noData}
      {_error}
      {id && _loading}
    </div>
  );
}

export default Ping;
