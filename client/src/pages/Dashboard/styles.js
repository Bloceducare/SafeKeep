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
`;

export const TopSection = styled.div``;

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
  flex: 1;
  padding-left: 3rem;
  background: #0b0d2e;
`;
export const OtherDashboardSection = styled.div`
  flex: 4;
  /* border:1px solid red; */
  background: #101010;
`;

export const OtherSectionWrapper = styled.div`
  max-width: 60rem;
  margin: auto;
  padding: 1.5rem;
  padding-top: 4rem;
`;
export const otherSectionContent = styled.div``;

export const Header = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  & li {
    align-items: center;
    list-style: none;
    margin: 2rem 0;
  }
`;

export const MobileNav = styled.div`
  display: flex;
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
`;
