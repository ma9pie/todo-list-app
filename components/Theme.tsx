import styled from "@emotion/styled";
import React from "react";

import MoonSvg from "@/images/bedtime.svg";
import SunSvg from "@/images/wb_sunny.svg";

type Props = {
  theme: string;
  onClick?: any;
};

const Theme = (props: Props) => {
  return (
    <Wrapper onClick={props.onClick}>
      {props.theme === "Light" && <SunSvg></SunSvg>}
      {props.theme === "Dark" && <MoonSvg></MoonSvg>}
    </Wrapper>
  );
};

export default Theme;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 24px;
  height: 24px;
`;
