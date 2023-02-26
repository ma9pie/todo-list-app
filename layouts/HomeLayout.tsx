import styled from "@emotion/styled";
import React, { useState } from "react";
import { ReactNode } from "react";
import { DraggableCore } from "react-draggable";

import { Header } from "@/components/header";
import { SideBar } from "@/components/sideBar";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
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

  const openSideBar = () => {
    setLeft(0);
  };

  return (
    <Container>
      <DraggableCore
        onStop={onStop}
        onDrag={(e, { deltaX }) => onDrag(left + deltaX)}
      >
        <Test>
          <SideBar left={left} transition={transition}></SideBar>
        </Test>
      </DraggableCore>
      <Header openSideBar={openSideBar}></Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default HomeLayout;

const Wrapper = styled.div``;
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
const Content = styled.div`
  height: calc(100vh - 40px);
`;

const Test = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;
