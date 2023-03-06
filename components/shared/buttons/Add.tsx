import styled from "@emotion/styled";
import React from "react";

import AddSvg from "@/images/add.svg";

type Props = {
  onClick: any;
};

const Add = (props: Props) => {
  return (
    <Wrapper>
      <AddSvg width={40} height={40} onClick={props.onClick}></AddSvg>
    </Wrapper>
  );
};

export default Add;

Add.defaultProps = {
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
