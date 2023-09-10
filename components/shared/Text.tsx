import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface Props {
  s10?: boolean;
  s12?: boolean;
  s14?: boolean;
  s16?: boolean;
  s18?: boolean;
  s20?: boolean;
  s24?: boolean;
  s30?: boolean;
  s36?: boolean;
  s48?: boolean;
  s60?: boolean;
  normal?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  color?: string;
  center?: boolean;
  breakAll?: boolean;
  hidden?: boolean;
  ellipsis?: boolean;
  nowrap?: boolean;
  children?: ReactNode;
}

const Text = ({
  s10,
  s12,
  s14,
  s16,
  s18,
  s20,
  s24,
  s30,
  s36,
  s48,
  s60,
  normal,
  medium,
  semibold,
  bold,
  color,
  center,
  breakAll,
  hidden,
  ellipsis,
  nowrap,
  children,
}: Props) => {
  const fontSize = s10
    ? "10px"
    : s12
    ? "12px"
    : s14
    ? "14px"
    : s16
    ? "16px"
    : s18
    ? "18px"
    : s20
    ? "20px"
    : s24
    ? "24px"
    : s30
    ? "30px"
    : s36
    ? "36px"
    : s48
    ? "48px"
    : s60
    ? "60px"
    : "16px";
  const fontWeight = normal
    ? 400
    : medium
    ? 500
    : semibold
    ? 600
    : bold
    ? 700
    : 400;

  return (
    <P
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      center={center}
      breakAll={breakAll}
      hidden={hidden}
      ellipsis={ellipsis}
      nowrap={nowrap}
    >
      {children}
    </P>
  );
};

export default Text;

const P = styled.p<{
  fontSize: string;
  fontWeight: number;
  color?: string;
  center?: boolean;
  breakAll?: boolean;
  hidden?: boolean;
  ellipsis?: boolean;
  nowrap?: boolean;
}>`
  font-family: "NotoSansKR";
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  text-align: ${(props) => props.center && "center"};
  word-break: ${(props) => props.breakAll && "break-all"};
  overflow: ${(props) => props.hidden && "hidden"};
  text-overflow: ${(props) => props.ellipsis && "ellipsis"};
  white-space: ${(props) => props.nowrap && "nowrap"};
`;
