import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/layouts/TestLayout";

function Components() {
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

  return (
    <Wrapper>
      <Grid>
        {colorSet.map((item, key) => (
          <Circle key={key} bg={item}></Circle>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div``;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px);
  gap: 16px;
`;
const Circle = styled.div<any>`
  width: 24px;
  height: 24px;
  border: 1px solid var(--sectionLine);
  border-radius: 50%;
  background-color: ${(props) => props.bg};
`;
