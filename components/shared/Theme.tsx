import styled from "@emotion/styled";
import React from "react";

import MoonSvg from "@/images/bedtime.svg";
import SunSvg from "@/images/wb_sunny.svg";

type Props = {
  theme: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Theme = (props: Props) => {
  return (
    <Wrapper className={props.className} onClick={props.onClick}>
      {props.theme === "Light" && <SunSvg></SunSvg>}
      {props.theme === "Dark" && <MoonSvg></MoonSvg>}
    </Wrapper>
  );
};

Theme.defaultProps = {
  onClick: () => {},
};

export default Theme;

const Wrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  width: 24px;
  height: 24px;
`;
