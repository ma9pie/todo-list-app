import styled from "@emotion/styled";
import React from "react";

import CheckSvg from "@/images/check.svg";

type Props = {
  onClick: any;
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
  cursor: pointer;
  & * {
    background-color: inherit;
  }
  path {
    fill: white;
  }
`;
