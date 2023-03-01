import styled from "@emotion/styled";
import Link from "next/link";
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
        onClick={props.openSideBar}
        onTouchEnd={props.openSideBar}
      ></MenuSvg>
      <LinkButton onClick={goToTestPage} onTouchEnd={goToTestPage}>
        Test
      </LinkButton>
      <Link href="/test" passHref>
        <LinkButton>Test</LinkButton>
      </Link>
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
const LinkButton = styled.div`
  width: 40px;
  height: 24px;
  background-color: var(--box);
  border: 1px solid red;
`;
