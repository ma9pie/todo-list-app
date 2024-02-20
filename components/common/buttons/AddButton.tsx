import styled from "@emotion/styled";
import React from "react";

import AddSvg from "@/images/add.svg";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AddButton = (props: Props) => {
  return (
    <Wrapper className="fill-white" onClick={props.onClick}>
      <AddSvg width={40} height={40}></AddSvg>
    </Wrapper>
  );
};

export default AddButton;

AddButton.defaultProps = {
  onClick: () => {},
};

const Wrapper = styled.div<any>`
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
  &:active:not([disabled]) {
    background-color: var(--blue700);
  }
`;
