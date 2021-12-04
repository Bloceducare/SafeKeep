import React from "react";
import { Link, Route, Switch } from "react-router-dom";
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

function Dashboard() {
  return (
    <div>
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
