import styled from "@emotion/styled";
import React from "react";

import CheckedSvg from "@/images/checked.svg";
import UncheckedSvg from "@/images/unchecked.svg";

interface Props {
  className?: string;
  checked?: boolean;
}

const CheckBox = ({ className, checked }: Props) => {
  if (checked)
    return (
      <Span>
        <CheckedSvg className={className}></CheckedSvg>
      </Span>
    );
  else
    return (
      <Span>
        <UncheckedSvg className={className}></UncheckedSvg>
      </Span>
    );
};

export default CheckBox;

const Span = styled.span``;
