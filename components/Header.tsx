import styled from "@emotion/styled";
import type { NextPage } from "next";
import React from "react";

import MenuSvg from "@/images/menu.svg";

// interface Props {
//   openSideBar: any;
// }

type Props = {
  openSideBar: any;
};

export const Header = (props: Props) => {
  return (
    <Wrapper>
      <MenuSvg
        onClick={props.openSideBar}
        onTouchEnd={props.openSideBar}
      ></MenuSvg>
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
