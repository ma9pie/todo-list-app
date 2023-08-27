import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useState } from "react";

import CheckSvg from "@/images/check.svg";
import PaintBoardSvg from "@/images/color_lens.svg";

const colorSet = [
  "#64a8ff",
  "#fb8890",
  "#ffbd51",
  "#ffdd78",
  "#c770e4",
  "#58c7c7",
  "#3fd599",
  "#d1d6db",
  "#4d4d59",
];

type Props = {
  color: string;
  colorList: Array<string>;
  setColor: Function;
};

const ColorSet = (props: Props) => {
  const [isOpenColorSet, setisOpenColorSet] = useState(false);

  const toggleColorSet = () => {
    setisOpenColorSet(!isOpenColorSet);
  };

  const selectColor = (color: string) => {
    props.setColor(color);
    setisOpenColorSet(false);
  };

  return (
    <Wrapper>
      <CurrentColor onClick={toggleColorSet}>
        <PaintBoardSvg className="fill-sub"></PaintBoardSvg>
        <Circle bg={props.color}></Circle>
      </CurrentColor>

      {isOpenColorSet && (
        <Grid>
          {colorSet.map((item, idx) => (
            <Circle key={idx} bg={item} onClick={() => selectColor(item)}>
              {props.color === item && (
                <CheckSvg
                  className="fill-white"
                  width={16}
                  height={16}
                ></CheckSvg>
              )}
            </Circle>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
};

export default ColorSet;

ColorSet.defaultProps = {
  colorNum: 0,
  setColorNum: () => {},
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 16px;
`;
const CurrentColor = styled.div`
  display: flex;
  justify-content: start;
  gap: 16px;
  cursor: pointer;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24px);
  gap: 16px;
`;
const Circle = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--sectionLine);
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  & * {
    background-color: transparent;
  }
  cursor: pointer;
`;
