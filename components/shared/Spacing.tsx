import React from "react";

interface Props {
  size: number;
}

const Spacing = ({ size }: Props) => {
  return (
    <div
      style={{
        flex: "none",
        height: size,
      }}
    ></div>
  );
};

export default Spacing;
