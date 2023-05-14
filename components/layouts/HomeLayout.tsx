import styled from "@emotion/styled";
import React, { ReactNode, useRef } from "react";

import Settings from "@/modals/contents/Settings";
import useModal from "@/hooks/useModal";
import MenuSvg from "@/images/menu.svg";
import SettingSvg from "@/images/settings.svg";
import Head from "@/shared/Head";
import SideBar from "@/shared/SideBar";

type Props = {
  children: ReactNode;
};

type RefProps = {
  openSideBar: () => void;
};

const HomeLayout = (props: Props) => {
  const modal = useModal();

  const ref = useRef<RefProps>(null);

  // Open SideBar
  const openSideBar = () => {
    ref.current?.openSideBar();
  };

  // Open Settings
  const openSettings = () => {
    modal.openBottomSheet({
      key: "settings",
      title: "Settings",
      component: Settings,
    });
  };

  return (
    <Wrapper>
      <Head></Head>
      <SideBar ref={ref}></SideBar>
      <Header>
        <MenuSvg width={40} height={40} onClick={openSideBar}></MenuSvg>
        <SettingSvg width={32} height={32} onClick={openSettings}></SettingSvg>
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
