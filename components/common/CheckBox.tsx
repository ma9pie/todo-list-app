import styled from "@emotion/styled";
import React from "react";

import CheckedSvg from "@/images/checked.svg";
import UncheckedSvg from "@/images/unchecked.svg";

interface Props {
  checked?: boolean;
  onClick?: () => void;
}

const CheckBox = ({ checked, onClick = () => {} }: Props) => {
  return (
    <Span onClick={onClick}>
      {checked ? <CheckedSvg></CheckedSvg> : <UncheckedSvg></UncheckedSvg>}
    </Span>
  );
};

export default CheckBox;

const Span = styled.span`
  display: flex;
  align-items: center;
`;
