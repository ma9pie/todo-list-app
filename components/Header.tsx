import styled from "@emotion/styled";
import React from "react";

import Setting from "@/components/Setting";
import MenuSvg from "@/images/menu.svg";
import SettingSvg from "@/images/settings.svg";
import modalUtils from "@/utils/modalUtils";

type Props = {
  openSideBar: Function;
};

const Header = (props: Props) => {
  const openSettings = () => {
    modalUtils.openBottomSheet({
      key: "settings",
      title: "Settings",
      component: Setting,
    });
  };

  return (
    <Wrapper>
      <MenuSvg width={40} height={40} onClick={props.openSideBar}></MenuSvg>
      <SettingSvg onClick={openSettings}></SettingSvg>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 240px;
  height: 60px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--sectionLine);
`;
