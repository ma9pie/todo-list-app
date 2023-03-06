import styled from "@emotion/styled";
import React, { forwardRef, Ref } from "react";

type Props = {
  left: number;
  transition: string;
};

const SideBar = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <Wrapper
      ref={ref}
      left={`${props.left}px`}
      transition={props.transition}
    ></Wrapper>
  );
});

export default SideBar;

SideBar.displayName = "SideBar";

const Wrapper = styled.div<any>`
  position: fixed;
  top: 0px;
  width: 200px;
  height: 100vh;
  left: ${(props) => props.left};
  transition: ${(props) => props.transition};
  background-color: var(--box);
  z-index: 2;
`;
const Content = styled.div<any>``;
