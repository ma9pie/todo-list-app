import styled from "@emotion/styled";
import React, { forwardRef, Ref } from "react";

type Props = {
  left: number;
  transition: string;
};

const SideBar = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
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

export default SideBar;

SideBar.displayName = "SideBar";

const Wrapper = styled.div`
  position: absolute;
`;
const Content = styled.div<any>`
  position: absolute;
  width: 200px;
  min-height: 100vh;
  left: ${(props) => props.left};
  transition: ${(props) => props.transition};
  background-color: var(--box);
  z-index: 2;
`;
