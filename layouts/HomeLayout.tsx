import styled from "@emotion/styled";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import Head from "@/components/Head";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

type Props = {
  children: ReactNode;
};

let pid: ReturnType<typeof setTimeout>;
const SIDEBAR_WIDTH = 200;
const TRANSITION = "left 0.2s ease-in-out, opacity 0.2s ease-in-out";

const HomeLayout = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [left, setLeft] = useState(-200);
  const [opacity, setOpacity] = useState(0);
  const [transition, setTransition] = useState("");
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (left === -SIDEBAR_WIDTH && opacity === 0) {
      clearTimeout(pid);
      pid = setTimeout(() => {
        setDisplay("none");
        setTransition("");
      }, 200);
    } else {
      setDisplay("block");
    }
  }, [left, opacity, transition]);

  // 사이드바 열기
  const openSideBar = () => {
    setLeft(0);
    setOpacity(calcOpacity(0));
    setTransition(TRANSITION);
  };

  // 사이드바 닫기
  const closeSideBar = () => {
    setLeft(-SIDEBAR_WIDTH);
    setOpacity(calcOpacity(-SIDEBAR_WIDTH));
    setTransition(TRANSITION);
  };

  // 투명도 계산
  const calcOpacity = (x: number) => {
    return ((x + SIDEBAR_WIDTH) / SIDEBAR_WIDTH) * 0.4;
  };

  return (
    <Wrapper>
      <Head></Head>
      <Container>
        <Overlay
          display={display}
          opacity={opacity}
          transition={transition}
          onClick={closeSideBar}
        ></Overlay>
        <SideBar ref={ref} left={left} transition={transition}></SideBar>
        <HeaderWrapper>
          <Header openSideBar={openSideBar}></Header>
        </HeaderWrapper>
        <ContentWrapper>
          <Content>{props.children}</Content>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default HomeLayout;

const Wrapper = styled.div``;
const Container = styled.div`
  position: relative;
  width: 100vw;
`;
const Overlay = styled.div<any>`
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display: ${(props) => props.display};
  opacity: ${(props) => props.opacity};
  transition: ${(props) => props.transition};
  z-index: 1;
  touch-action: auto;
`;

const Content = styled.div`
  min-width: var(--minWidth);
  height: calc(100% - 60px);
`;
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
`;
const ContentWrapper = styled.div`
  padding-top: 60px;
`;
