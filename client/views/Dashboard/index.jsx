import { useEffect } from "react";
import  Link  from "next/link";
import { useDispatch } from "react-redux";
// import { useMoralis } from "react-moralis";
import { checkVaultAsync, updateTokenPriceAsync } from "../Wallet/state";
import { getUserAddress } from "@state/user";

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
  MobileNav,
} from "./styles";
import Wallet from "../Wallet";
import Inheritors from "../Inheritors";
import Ping from "../Ping";
import BackupAddress from "../BackupAddress";
// import WalletIcon from "../../assets/wallet.svg";
// import PingIcon from "../../assets/ping.svg";
// import InheritIcon from "../../assets/inherit.svg";
// import BackupIcon from "../../assets/backup.svg";
import CreateVaultModal from "../Wallet/Components/DepositWithdrawal/CreateVault";
import TokenHistory from "../../components/TokenSingleHistory";
import { AuthenticatedHea } from "../../components/Header";
import { isMobile, isTablet } from "react-device-detect";
import TokenNativeHistory from "../../components/TokenNativeHistory";
import { currentNetworkConfig } from "../../utils/networkConfig";
import {useAccount } from 'wagmi'

function Dashboard() {
  const {address, data:isAuthenticated} = useAccount()
  const dispatch = useDispatch();
  // const { user } = useMoralis();
  // const address = user?.get("ethAddress");
  // const { isAuthenticated } = useMoralis();

  useEffect(() => {
    // if (!address) return;
    // dispatch(getUserAddress(address));
    // new Promise((res, rej) => res(""))
    //   .then(() => localStorage.setItem("safekeepAddress", address))
    //   .then(() => dispatch(checkVaultAsync(address)))
    //   .then(() => dispatch(updateTokenPriceAsync()));
  }, [address, dispatch]);

  //update tokens prices every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      //  dispatch(updateTokenPriceAsync());
    }, 6000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const _MobileNav = (
    <MobileNav>
      <div>
        <Link href="/dashboard">
          <DashboardIcon src='/assets/wallet.svg' alt="wallet" />
        </Link>
      </div>
      <div>
        <Link href="/backupaddress">
          <DashboardIcon src='/assets/backup.svg' alt="backup" />
        </Link>
      </div>
      <div>
        {" "}
        <Link href="/ping">
          <DashboardIcon src='/assets/ping.svg' alt="ping" />
        </Link>
      </div>
      <div>
        <Link href="/inheritors">
          <DashboardIcon src='/assets/inherit.svg' alt="inherit" />
        </Link>
      </div>
    </MobileNav>
  );

  const _DesktopNav = (
    <DashboardSection>
      <Header>Dashboard</Header>
      <TopSection>
        <List>
          <li>
            <Link href="/dashboard">
              <a className="text-white ">
              <DashboardIcon src='/assets/wallet.svg' alt="wallet" />
              Wallet
              </a>
            </Link>
          </li>
          <li>
            <Link href="/backupaddress">
            <a className="text-white ">
              <DashboardIcon src='/assets/backup.svg' alt="backup" />
              Backup Address
              </a>
            </Link>
          </li>
          <li>
            <Link href="/ping">
            <a className="text-white ">
              <DashboardIcon src='/assets/ping.svg' alt="ping" />
              Ping
              </a>
            </Link>
          </li>
          <li>
            <Link href="/inheritors">
            <a className="text-white ">
              <DashboardIcon src='/assets/inherit.svg' alt="inherit" />
              Inheritors
              </a>
            </Link>
          </li>
        </List>
      </TopSection>
      <BottomSection></BottomSection>
    </DashboardSection>
  );

  return (
    <div>
      {(isMobile || isTablet) && _MobileNav}

      {isAuthenticated && <AuthenticatedHea />}
      <CreateVaultModal />
      <DashboardWrapper>
        {!isMobile && _DesktopNav}
        <OtherDashboardSection>
          <OtherSectionWrapper>
         <Wallet />
            {/* <Switch>
              <Route exact path="/dashboard" component={Wallet} />
              <Route path="/inheritors" component={Inheritors} />
              <Route path="/ping" component={Ping} />
              <Route
                path="/backupaddress"
                component={BackupAddress}
              />
              <Route
                path={`/${currentNetworkConfig()?.currencyName}`}
                component={TokenNativeHistory}
              />
              <Route
                exact
                path="/:address"
                component={TokenHistory}
              />
            </Switch> */}
          </OtherSectionWrapper>
        </OtherDashboardSection>
      </DashboardWrapper>
    </div>
  );
}

export default Dashboard;
