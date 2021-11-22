import React from 'react'
import { Link,Route, Switch } from 'react-router-dom';
import { FaWallet } from "react-icons/fa";
import { DashboardWrapper, OtherDashboardSection, DashboardSection, Header, List, TopSection, BottomSection, BalanceDiv, OtherSectionWrapper, DashboardIcon } from './styles'
import Wallet from '../Wallet';
import Inheritors from '../Inheritors';
import Ping from '../Ping';
import BackupAddress from '../BackupAddress';
import WalletIcon from '../../assets/wallet.svg'
import PingIcon from '../../assets/ping.svg'
import InheritIcon from '../../assets/inherit.svg'
import BackupIcon from '../../assets/backup.svg'
import PrivateRoute from '../../components/PrivateRoute';
import { useMoralis } from 'react-moralis';



function Dashboard() {
    const {isAuthenticated}  = useMoralis()
    return (
        <div >
           <DashboardWrapper>
               <DashboardSection>
                   <Header>
                       Dashboard
                       </Header>
                       
                       <TopSection >

                       <List>
                           <li> 
                            <Link to ='/dashboard/wallet/assets'>
                           <DashboardIcon src={WalletIcon} alt='wallet' />
                           Wallet
                           </Link>
                            </li>
                           <li> 
                            <Link to ='/dashboard/backupaddress'>
                                
                            <DashboardIcon src = {BackupIcon} alt ='backup' />
                              Backup Address
                           </Link>
                            </li>
                           <li> 
                           <Link to ='/dashboard/ping'>
                          <DashboardIcon src = {PingIcon} alt = 'ping'/>
                           Ping
                           </Link>
                            </li>
                            <li>
                            <Link to ='/dashboard/inheritors'>
                           <DashboardIcon src = {InheritIcon} alt = 'inherit' />
                           Inheritors
                           </Link>
                            </li>
                       </List>
                       </TopSection>
                       <BottomSection>
                       
                       </BottomSection>               
               </DashboardSection>
               <OtherDashboardSection>         
              <OtherSectionWrapper>
              <Switch>
<Route  auth = {isAuthenticated}  path="/dashboard/wallet/assets" component={Wallet} />
<Route auth = {isAuthenticated}   path="/dashboard/wallet" component={Wallet} />
<Route  auth = {isAuthenticated}  auth = {isAuthenticated} path="/dashboard/inheritors" component={Inheritors} />
<Route  auth = {isAuthenticated}  path="/dashboard/ping" component={Ping} />
<Route  auth = {isAuthenticated}  path="/dashboard/backupaddress" component={BackupAddress} />
</Switch>
              </OtherSectionWrapper>
               </OtherDashboardSection>
           </DashboardWrapper>
        </div> 
    )
}

export default Dashboard
