import styled from "@emotion/styled";
import type { NextPage } from "next";
import React, { forwardRef, Ref, useEffect, useRef } from "react";

// interface Props {
//   ref: Ref<HTMLDivElement>;
//   left: number;
//   transition: string;
// }

type Props = {
  left: number;
  transition: string;
};

export const SideBar = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <Wrapper>
      <Content
        ref={ref}
        left={`${props.left}px`}
        transition={props.transition}
      ></Content>
    </Wrapper>
  );
});

SideBar.displayName = "SideBar";

const Wrapper = styled.div`
  position: absolute;
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
