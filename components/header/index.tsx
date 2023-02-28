import styled from "@emotion/styled";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import ListSvg from "@/svg/ListSvg";

interface Props {
  setLeft: Function;
}

export const Header: NextPage<Props> = ({ setLeft }) => {
  const openSideBar = () => {};

  return (
    <Wrapper>
      <ListSvg
        onClick={() => {
          setLeft(0);
        }}
        onTouchEnd={() => {
          setLeft(0);
        }}
      ></ListSvg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--sectionLine);
`;
