import styled from "@emotion/styled";
import React from "react";

import MenuSvg from "@/images/menu.svg";

type Props = {
  openSideBar: any;
};

const Header = (props: Props) => {
  return (
    <Wrapper>
      <MenuSvg
        onClick={props.openSideBar}
        onTouchEnd={props.openSideBar}
      ></MenuSvg>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--sectionLine);
`;
