import styled from "styled-components";

// export const Container = styled.div`
//     text-align: center;
// `

export const DashboardIcon = styled.img`
  margin-right: 0.5rem;
  transform: scale(0.7);
`;

export const iconStyle = {
  color: "#2B5BCF",
};
export const DashboardWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 100vh;
  overflow: hidden;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const BalanceDiv = styled.div`
  background: #2b5bcf;
  padding: 0.3rem;
  display: inline-block;
  margin: 0.4rem auto;

  & span {
    text-align: center;
    font-size: 0.7rem;
  }

  & > div {
    font-weight: bold;
    font-size: 0.8rem;
  }
`;

export const BottomSection = styled.div`
  align-self: flex-end;
`;
export const DashboardSection = styled.div`
  max-width: 29%;
  width: 100%;
  padding-left: 3rem;
  background: #0b0d2e;
`;
export const OtherDashboardSection = styled.div`
  max-width: 71%;
  width: 100%;
  /* border:1px solid red; */
  background: #101010;
`;

export const OtherSectionWrapper = styled.div`
  max-width: 60rem;
  width: "100%";
  margin: auto;
  padding: 1.5rem;
  padding-top: 4rem;
`;
export const otherSectionContent = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 36px;
`;

export const Header = styled.p`
  font-size: 36px;
  font-weight: 500;
  line-height: 44px;
  padding-top: 40px;
  font-family: "clash grotesk regular";
  margin-bottom: 90px;
  max-width: 331px;
  width: 100%;
`;

export const List = styled.div`
  margin: 0;
  padding: 0;
  max-width: 331px;
  width: 100%;
  & li {
    align-items: center;
    list-style: none;
    margin-bottom: 50px;
    display: flex;
    &:hover {
      background: rgba(254, 254, 255, 0.06);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    padding: 13px 19px;
  }
`;

export const ListText = styled.span`
  font-family: "clash grotesk regular";
  line-height: 28px;
  font-size: 27px;
  line-spacing: 0.15px;
  color: #fff;
`;

export const MobileNav = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  img {
    width: 3rem;
    margin-right: 1rem;
    margin-left: 1rem;
  }
  background: #0b0d2e;
  width: 100%;
  height: 5rem;
  z-index: 100;
  @media (max-width: 768px) {
    display: flex;
  }
`;
