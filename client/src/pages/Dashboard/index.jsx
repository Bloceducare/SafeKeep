import { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import { checkVaultAsync } from "../Wallet/state";
import { getUserAddress } from "../../state/user";

import {
  DashboardWrapper,
  OtherDashboardSection,
  DashboardSection,
  Header,
  List,
  TopSection,
  BottomSection,
  OtherSectionWrapper,
  DashboardIcon,
} from "./styles";
import Wallet from "../Wallet";
import Inheritors from "../Inheritors";
import Ping from "../Ping";
import BackupAddress from "../BackupAddress";
import WalletIcon from "../../assets/wallet.svg";
import PingIcon from "../../assets/ping.svg";
import InheritIcon from "../../assets/inherit.svg";
import BackupIcon from "../../assets/backup.svg";
import CreateVaultModal from "../Wallet/Components/DepositWithdrawal/CreateVault";
import { AuthenticatedHea } from "../../components/Header";

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useMoralis();
  const address = user?.get("ethAddress");

  useEffect(() => {
    if (!address) return;
    dispatch(getUserAddress(address));
    localStorage.setItem("safekeepAddress", address);

    if (address) {
      dispatch(checkVaultAsync(address));
    }
  }, [address, dispatch]);

  return (
    <div>
      <AuthenticatedHea />
      <CreateVaultModal />
      <DashboardWrapper>
        <DashboardSection>
          <Header>Dashboard</Header>
          <TopSection>
            <List>
              <li>
                <Link to="/dashboard">
                  <DashboardIcon src={WalletIcon} alt="wallet" />
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/dashboard/backupaddress">
                  <DashboardIcon src={BackupIcon} alt="backup" />
                  Backup Address
                </Link>
              </li>
              <li>
                <Link to="/dashboard/ping">
                  <DashboardIcon src={PingIcon} alt="ping" />
                  Ping
                </Link>
              </li>
              <li>
                <Link to="/dashboard/inheritors">
                  <DashboardIcon src={InheritIcon} alt="inherit" />
                  Inheritors
                </Link>
              </li>
            </List>
          </TopSection>
          <BottomSection></BottomSection>
        </DashboardSection>
        <OtherDashboardSection>
          <OtherSectionWrapper>
            <Switch>
              <Route exact path="/dashboard" component={Wallet} />
              <Route path="/dashboard/inheritors" component={Inheritors} />
              <Route path="/dashboard/ping" component={Ping} />
              <Route
                path="/dashboard/backupaddress"
                component={BackupAddress}
              />
            </Switch>
          </OtherSectionWrapper>
        </OtherDashboardSection>
      </DashboardWrapper>
    </div>
  );
}

export default Dashboard;
