import styled from "@emotion/styled";
import React from "react";

type Props = {
  width: string;
  height: string;
  margin: string;
  color: string;
};

function Loading({ width, height, margin, color }: Props) {
  return (
    <Wrapper
      width={width}
      height={height}
      margin={margin}
      color={color}
    ></Wrapper>
  );
}

export default Loading;

Loading.defaultProps = {
  width: "30px",
  height: "30px",
  margin: "auto",
  color: "var(--brandColor)",
};

const Wrapper = styled.div<any>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  border-width: 3px;
  border-style: solid;
  border-color: ${(props) => props.color};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  background-color: transparent;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
