import styled from "@emotion/styled";
import React from "react";

import CheckSvg from "@/images/check.svg";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Done = (props: Props) => {
  return (
    <Wrapper>
      <CheckSvg width={40} height={40} onClick={props.onClick}></CheckSvg>
    </Wrapper>
  );
};

export default Done;

Done.defaultProps = {
  onClick: () => {},
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--blue500);
  box-shadow: var(--boxShadow);
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
  cursor: pointer;
  & * {
    background-color: inherit;
  }
  path {
    fill: white;
  }
  &:active:not([disabled]) {
    background-color: var(--blue700);
  }
`;
