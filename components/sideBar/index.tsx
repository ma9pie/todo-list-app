import { css } from "@emotion/css";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { DraggableCore } from "react-draggable";

import useClickOutside from "@/hooks/useClickOutside";

interface Props {
  left: number;
  transition: string;
  isOpen?: boolean;
  setIsOpen?: Function;
}

export const SideBar: NextPage<Props> = ({ left, transition }) => {
  return (
    <Wrapper>
      {/* <Overlay opacity={isOpen ? 0.4 : 0} onClick={closeSideBar}></Overlay> */}
      <Content left={`${left}px`} transition={transition}></Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
`;
const Overlay = styled.div<{ opacity: number }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: black;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s ease-in-out;
  pointer-events: none;
`;
const Content = styled.div<{ left: string; transition: string }>`
  position: absolute;
  width: 200px;
  min-height: 100vh;
  left: ${(props) => props.left};
  transition: ${(props) => props.transition};
  background-color: var(--box);
  z-index: 2;
`;
