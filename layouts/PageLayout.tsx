import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { ReactNode, useRef } from "react";

import Settings from "@/components/home/Settings";
import Head from "@/components/shared/Head";
import SideBar from "@/components/shared/SideBar";
import TaskInput from "@/components/todo/TaskInput";
import MenuSvg from "@/images/menu.svg";
import MoreVertSvg from "@/images/more_vert.svg";
import PushPinSvg from "@/images/push_pin.svg";
import SettingSvg from "@/images/settings.svg";
import modalUtils from "@/utils/modalUtils";

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
        <MenuSvg width={40} height={40} onClick={openSideBar}></MenuSvg>
        <IconContainer>
          <PushPinSvg
            width={32}
            height={32}
            className={pushPinStyles}
            color="red"
          ></PushPinSvg>
          <MoreVertSvg width={32} height={32}></MoreVertSvg>
        </IconContainer>
      </Header>
      <Content>{props.children}</Content>
      <TaskInput></TaskInput>
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
  height: calc(100vh - 120px);
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
