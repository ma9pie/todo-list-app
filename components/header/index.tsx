import styled from "@emotion/styled";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import MenuSvg from "@/images/menu.svg";

interface Props {
  openSideBar: any;
}

export const Header: NextPage<Props> = ({ openSideBar }) => {
  return (
    <Wrapper>
      <MenuSvg onClick={openSideBar} onTouchEnd={openSideBar}></MenuSvg>
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
