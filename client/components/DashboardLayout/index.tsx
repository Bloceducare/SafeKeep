import Link from "next/link";
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
} from "./style";

import { AuthenticatedHe} from "@components/Header";
import { isMobile, isTablet } from "react-device-detect";
import { useAccount } from "wagmi";
import useAuth from "@hooks/useAuth";

function DashboardLayout({ children }) {
 //  const {isAuthenticated, fetchingUser} = useAuth()

 // if(fetchingUser) return 'Loading...'

  const _MobileNav = (
    <MobileNav>
      <div>
        <Link href="/dashboard">
          <DashboardIcon src="/assets/wallet.svg" alt="wallet" />
        </Link>
      </div>
      <div>
        <Link href="/backup-address">
          <DashboardIcon src="/assets/backup.svg" alt="backup" />
        </Link>
      </div>
      <div>
        {" "}
        <Link href="/ping">
          <DashboardIcon src="/assets/ping.svg" alt="ping" />
        </Link>
      </div>
      <div>
        <Link href="/inheritors">
          <DashboardIcon src="/assets/inherit.svg" alt="inherit" />
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
                <DashboardIcon src="/assets/wallet.svg" alt="wallet" />
                Wallet
              </a>
            </Link>
          </li>
          <li>
            <Link href="/backup-address">
              <a className="text-white ">
                <DashboardIcon src="/assets/backup.svg" alt="backup" />
                Backup Address
              </a>
            </Link>
          </li>
          <li>
            <Link href="/ping">
              <a className="text-white ">
                <DashboardIcon src="/assets/ping.svg" alt="ping" />
                Ping
              </a>
            </Link>
          </li>
          <li>
            <Link href="/inheritors">
              <a className="text-white ">
                <DashboardIcon src="/assets/inherit.svg" alt="inherit" />
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
      <DashboardWrapper>
        {(!isMobile || !isTablet) && _DesktopNav}
        <OtherDashboardSection>
          <OtherSectionWrapper>
           {children}
          </OtherSectionWrapper>
        </OtherDashboardSection>
      </DashboardWrapper>
    </div>
  );
}

export default DashboardLayout;
