import styled from "@emotion/styled";
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";

const SIDEBAR_WIDTH = 200;

type Props = {};

type RefProps = {
  openSideBar: () => void;
};

const SideBar = forwardRef((props: Props, ref: Ref<RefProps>) => {
  const [sideBarLeft, setSideBarLeft] = useState(`${-SIDEBAR_WIDTH}px`);
  const [overlayLeft, setOverlayLeft] = useState("-100vw");
  const [opacity, setOpacity] = useState(0);

  useImperativeHandle(ref, () => ({
    openSideBar,
  }));

  // 사이드바 열기
  const openSideBar = () => {
    setSideBarLeft("0px");
    setOverlayLeft("0px");
    setOpacity(calcOpacity(0));
  };

  // 사이드바 닫기
  const closeSideBar = () => {
    setSideBarLeft(`${-SIDEBAR_WIDTH}px`);
    setOpacity(calcOpacity(-SIDEBAR_WIDTH));
    setTimeout(() => {
      setOverlayLeft("-100vw");
    }, 200);
  };

  // 투명도 계산
  const calcOpacity = (x: number) => {
    return ((x + SIDEBAR_WIDTH) / SIDEBAR_WIDTH) * 0.4;
  };

  return (
    <Wrapper>
      <Overlay
        left={overlayLeft}
        opacity={opacity}
        onClick={closeSideBar}
      ></Overlay>
      <Content left={sideBarLeft} width={`${SIDEBAR_WIDTH}px`}></Content>
    </Wrapper>
  );
});

export default SideBar;

SideBar.displayName = "SideBar";

const Wrapper = styled.div``;
const Overlay = styled.div<any>`
  position: fixed;
  top: 0px;
  left: ${(props) => props.left};
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
`;
const Content = styled.div<any>`
  position: fixed;
  top: 0px;
  width: ${(props) => props.width};
  height: 100vh;
  left: ${(props) => props.left};
  transition: left 0.2s ease-in-out;
  background-color: var(--box);
  z-index: 2;
`;
