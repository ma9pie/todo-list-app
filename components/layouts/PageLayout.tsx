import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { ReactNode, useRef } from "react";

import MenuSvg from "@/images/menu.svg";
import MoreVertSvg from "@/images/more_vert.svg";
import PushPinSvg from "@/images/push_pin.svg";
import SettingSvg from "@/images/settings.svg";
import Settings from "@/modals/contents/Settings";
import Head from "@/shared/Head";
import SideBar from "@/shared/SideBar";
import TextLogo from "@/shared/TextLogo";

type Props = {
  children: ReactNode;
};

type RefProps = {
  openSideBar: () => void;
};

const PageLayout = (props: Props) => {
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
        <MenuSvg width={40} height={40} onClick={openSideBar}></MenuSvg>
        {/* <IconContainer>
          <PushPinSvg
            width={32}
            height={32}
            className={pushPinStyles}
            color="red"
          ></PushPinSvg>
          <MoreVertSvg width={32} height={32}></MoreVertSvg>
        </IconContainer> */}
      </Header>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default PageLayout;

const pushPinStyles = css`
  transform: rotate(0.125turn);
`;
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
  gap: 16px;
`;
