import styled from "@emotion/styled";
import React from "react";

import useTheme from "@/hooks/useTheme";
import MoonSvg from "@/images/bedtime.svg";
import SunSvg from "@/images/wb_sunny.svg";

type Props = {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Theme = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Wrapper className={props.className} onClick={props.onClick}>
      {theme === "Light" && <SunSvg></SunSvg>}
      {theme === "Dark" && <MoonSvg></MoonSvg>}
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
