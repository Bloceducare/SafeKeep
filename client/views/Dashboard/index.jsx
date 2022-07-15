import { useEffect } from "react";
import  Link  from "next/link";
import { useDispatch } from "react-redux";
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
  useEffect(() => {
   
  }, [address, dispatch]);

  //update tokens prices every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      //  dispatch(updateTokenPriceAsync());
    }, 6000);
    return () => clearInterval(interval);
  }, [dispatch]);


  return (
    <div>
      <CreateVaultModal />  
      <Wallet />
    </div>
  );
}

export default Dashboard;
