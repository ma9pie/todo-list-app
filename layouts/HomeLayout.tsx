import styled from "@emotion/styled";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { DraggableCore } from "react-draggable";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

type Props = {
  children: ReactNode;
};

let pid: any;
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

  // 드래그에서 마우스 뗄 때
  const onStop = () => {
    const nextLeft = left <= -SIDEBAR_WIDTH / 2 ? -SIDEBAR_WIDTH : 0;
    setLeft(nextLeft);
    setOpacity(calcOpacity(nextLeft));
    setTransition(TRANSITION);
  };

  // 드래그
  const onDrag = (value: number) => {
    let nextLeft = 0;
    if (value < -SIDEBAR_WIDTH) {
      nextLeft = -SIDEBAR_WIDTH;
    } else if (value > 0) {
      nextLeft = 0;
    } else {
      nextLeft = value;
    }
    setLeft(nextLeft);
    setOpacity(calcOpacity(nextLeft));
    setTransition("");
  };

  // 투명도 계산
  const calcOpacity = (x: number) => {
    return ((x + SIDEBAR_WIDTH) / SIDEBAR_WIDTH) * 0.4;
  };

  return (
    <DraggableCore
      scale={0.75}
      onStop={onStop}
      onDrag={(e, { deltaX }) => {
        onDrag(left + deltaX);
      }}
    >
      <Container>
        <Overlay
          display={display}
          opacity={opacity}
          transition={transition}
          onClick={closeSideBar}
          onTouchEnd={closeSideBar}
        ></Overlay>
        <SideBar ref={ref} left={left} transition={transition}></SideBar>
        <Header openSideBar={openSideBar}></Header>
        <Content>{props.children}</Content>
      </Container>
    </DraggableCore>
  );
};

export default HomeLayout;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
const Overlay = styled.div<any>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display: ${(props) => props.display};
  opacity: ${(props) => props.opacity};
  transition: ${(props) => props.transition};
`;

const Content = styled.div`
  height: calc(100vh - 60px);
`;
