import type { NextPage } from "next";
import * as React from "react";

interface Props {
  width?: string;
  height?: string;
  color?: string;
  cursor?: string;
  onClick(): any;
}

const SvgComponent: NextPage<Props> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <defs></defs>
    <rect height="3" rx="2" width="22" x="1" y="2" fill={props.color} />
    <rect height="3" rx="2" width="22" x="1" y="18" fill={props.color} />
    <rect height="3" rx="2" width="22" x="1" y="10" fill={props.color} />
  </svg>
);

export default SvgComponent;

SvgComponent.defaultProps = {
  color: "var(--main)",
  cursor: "pointer",
};
