import React from 'react'
import { Link,Route, Switch } from 'react-router-dom';
import { FaWallet } from "react-icons/fa";
import { DashboardWrapper, OtherDashboardSection, DashboardSection, Header, List, iconStyle, TopSection, BottomSection, BalanceDiv, OtherSectionWrapper } from './styles'
import Wallet from '../Wallet';
import Inheritors from '../Inheritors';
import Ping from '../Ping';
import BackupAddress from '../BackupAddress';


const Balance = ({title = 'Total Balance', amount='2, 2222, 000'})=>{
    return (
        <BalanceDiv>
            <span>Total Balance</span>
            <div className='text-center' >USD {` ${amount}`}</div>
        </BalanceDiv>
    )
}
function Dashboard() {
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
                            <Link to ='/wallet'>
                           <FaWallet className ='dashboard-icons dmr-1' style ={iconStyle} />
                           Wallet
                           </Link>
                            </li>
                           <li> 
                            <Link to ='/backupaddress'>
                           <FaWallet className ='dashboard-icons dmr-1' style ={iconStyle} />
                           Backup Address
                           </Link>
                            </li>
                           <li> 
                           <Link to ='/ping'>
                           <FaWallet className ='dashboard-icons dmr-1' style ={iconStyle} />
                           Ping
                           </Link>
                            </li>
                            <li>
                            <Link to ='/inheritors'>
                           <FaWallet className ='dashboard-icons dmr-1' style ={iconStyle} />
                           Inheritors
                           </Link>
                            </li>
                       </List>
                       </TopSection>
                       <BottomSection>
                         <Balance />
                         <br />
                         <Balance />
                       </BottomSection>               
               </DashboardSection>
               <OtherDashboardSection>         
              <OtherSectionWrapper>
              <Switch>

<Route exact path="/wallet" component={Wallet} />
<Route exact path="/inheritors" component={Inheritors} />
<Route exact path="/ping" component={Ping} />
<Route exact path="/backupaddress" component={BackupAddress} />
</Switch>
              </OtherSectionWrapper>
               </OtherDashboardSection>
           </DashboardWrapper>
        </div>
    )
}

export default Dashboard
