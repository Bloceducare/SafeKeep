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
  ListText,
  HeaderContainer,
} from "./style";

import { AuthenticatedHe, UnAuthenticatedHeader } from "@components/Header";
import { isMobile, isTablet } from "react-device-detect";
import { useAccount } from "wagmi";

function DashboardLayout({ children }) {
  const { data: isAuthenticated } = useAccount();

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
      <HeaderContainer>
        <Header>Dashboard</Header>
      </HeaderContainer>
      <TopSection>
        <List>
          <li>
            <Link href="/dashboard">
              <a style={{ display: "flex", alignItems: "center" }}>
                <DashboardIcon
                  src="/assets/wallet.svg"
                  alt="wallet"
                  style={{ height: "100%", marginRight: "15px" }}
                />
                <ListText>Wallet</ListText>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/backup-address">
              <a style={{ display: "flex", alignItems: "center" }}>
                <DashboardIcon
                  src="/assets/backup.svg"
                  alt="backup"
                  style={{ height: "100%", marginRight: "8px" }}
                />
                <ListText> Backup Address</ListText>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/ping">
              <a style={{ display: "flex", alignItems: "center" }}>
                <DashboardIcon
                  src="/assets/ping.svg"
                  alt="ping"
                  style={{ height: "100%", marginRight: "15px" }}
                />
                <ListText>Ping</ListText>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/inheritors">
              <a style={{ display: "flex", alignItems: "center" }}>
                <DashboardIcon
                  src="/assets/inherit.svg"
                  alt="inherit"
                  style={{ height: "100%", marginRight: "10px" }}
                />
                <ListText>Inheritors</ListText>
              </a>
            </Link>
          </li>
        </List>
      </TopSection>
      <BottomSection></BottomSection>
    </DashboardSection>
  );
  console.log(isMobile);
  return (
    <div>
      {(isMobile || isTablet) && _MobileNav}
      {isAuthenticated && <AuthenticatedHe />}
      <DashboardWrapper>
        {(!isMobile || !isTablet) && _DesktopNav}
        <OtherDashboardSection>
          <OtherSectionWrapper>{children}</OtherSectionWrapper>
        </OtherDashboardSection>
      </DashboardWrapper>
    </div>
  );
}

export default DashboardLayout;
