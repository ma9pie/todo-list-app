import styled from "@emotion/styled";
import React from "react";

type Props = {
  color: string;
  size: number;
};

const Dot = ({ color, size }: Props) => {
  return <Wrapper bg={color} size={size}></Wrapper>;
};

export default Dot;

Dot.defaultProps = {
  color: "",
  size: 16,
};

const Wrapper = styled.div<any>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border: 1px solid var(--sectionLine);
  border-radius: 50%;
  background-color: ${(props) => props.bg} !important;
`;
