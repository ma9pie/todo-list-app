import styled from "@emotion/styled";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import ListSvg from "@/svg/ListSvg";

interface Props {
  openSideBar: Function;
}

export const Header: NextPage<Props> = ({ openSideBar }) => {
  return (
    <Wrapper>
      <ListSvg
        onClick={() => {
          openSideBar();
        }}
        onTouchEnd={() => {
          openSideBar();
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
