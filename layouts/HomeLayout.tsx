import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import { DraggableCore } from "react-draggable";

import { Header } from "@/components/header";
import { SideBar } from "@/components/sideBar";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
  const ref = useRef(null);

  const [left, setLeft] = useState(-200);
  const [transition, setTransition] = useState("");

  const onStop = () => {
    console.log("onStop");
    setLeft(left <= -100 ? -200 : 0);
    setTransition("left 0.3s ease-in-out");
    setTimeout(() => {
      setTransition("");
    }, 200);
  };

  const onDrag = (nextValue: number) => {
    console.log("onDrag");
    if (nextValue < -200) {
      setLeft(-200);
    } else if (nextValue > 0) {
      setLeft(0);
    } else {
      setLeft(nextValue);
    }
  };

  return (
    <DraggableCore
      onStop={onStop}
      onDrag={(e, { deltaX }) => {
        onDrag(left + deltaX);
      }}
    >
      <Container>
        <Overlay
          opacity={((left + 200) / 200) * 0.4}
          display={left === -200 ? "none" : "block"}
          onClick={() => setLeft(-200)}
        ></Overlay>
        <SideBar left={left} transition={transition}></SideBar>
        <Header setLeft={setLeft}></Header>
        <Content>{children}</Content>
      </Container>
    </DraggableCore>
  );
};

export default HomeLayout;

const Wrapper = styled.div``;
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
const Overlay = styled.div<{ opacity: number; display: string }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display: ${(props) => props.display};
  opacity: ${(props) => props.opacity};
`;

const Content = styled.div`
  height: calc(100vh - 40px);
`;
