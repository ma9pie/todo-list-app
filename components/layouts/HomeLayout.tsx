import styled from "@emotion/styled";
import React, { ReactNode, useRef } from "react";

import MenuSvg from "@/images/menu.svg";
import Head from "@/shared/Head";
import SideBar from "@/shared/SideBar";
import TextLogo from "@/shared/TextLogo";

type Props = {
  children: ReactNode;
};

type RefProps = {
  openSideBar: () => void;
};

const HomeLayout = (props: Props) => {
  const ref = useRef<RefProps>(null);

  // Open SideBar
  const openSideBar = () => {
    ref.current?.openSideBar();
  };

  return (
    <Wrapper>
      <Head></Head>
      <SideBar ref={ref}></SideBar>
      <Header>
        <TextLogo></TextLogo>
        <IconContainer>
          <MenuSvg width={40} height={40} onClick={openSideBar}></MenuSvg>
        </IconContainer>
      </Header>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default HomeLayout;

const Wrapper = styled.div``;
const Content = styled.div`
  min-width: var(--minWidth);
  height: calc(100vh - 60px);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 240px;
  height: 60px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--sectionLine);
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
