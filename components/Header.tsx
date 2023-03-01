import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

import MenuSvg from "@/images/menu.svg";

type Props = {
  openSideBar: any;
};

const Header = (props: Props) => {
  const router = useRouter();

  const goToTestPage = () => {
    router.push("/test");
  };

  return (
    <Wrapper>
      <MenuSvg
        width={40}
        height={40}
        onClick={props.openSideBar}
        onTouchEnd={props.openSideBar}
      ></MenuSvg>
      <LinkButton onClick={goToTestPage} onTouchEnd={goToTestPage}>
        Test
      </LinkButton>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--sectionLine);
`;
const LinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  background-color: var(--box);
`;
