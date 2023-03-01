import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import Theme from "@/components/Theme";
import useEventListener from "@/hooks/useEventListener";
import AppsSvg from "@/images/apps.svg";
import CloseSvg from "@/images/close.svg";

type Props = {
  children: ReactNode;
};

const TestLayout = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [title, setTitle] = useState("Index");
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const pageList = [
    {
      title: "index",
      url: "/test",
    },
    {
      title: "typography",
      url: "/test/typography",
    },
    {
      title: "icons",
      url: "/test/icons",
    },
  ];

  useEffect(() => {
    setTitle(convertFirstStr(router.pathname.split("/").reverse()[0]));
  }, [router.pathname]);

  // 페이지 이동
  const changePage = (item: any) => {
    setIsOpenMenu(false);
    router.push(item.url);
  };

  // 영역 외 클릭 시 사이드바 닫기
  const handleClickOutSide = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpenMenu(false);
    }
  };

  // 첫글자 대문자로 변환
  const convertFirstStr = (str: string) => {
    return str.replace(/^[a-z]/, (str) => str.toUpperCase());
  };

  useEventListener("mousedown", handleClickOutSide);

  return (
    <Wrapper>
      {/* 사이드바 */}
      <Sidebar ref={ref} left={isOpenMenu ? "0px" : "-200px"}>
        <Top>
          <CloseSvg
            width={30}
            height={30}
            onClick={() => setIsOpenMenu(false)}
          ></CloseSvg>
        </Top>
        <ListBox>
          {pageList.map((item, key) => (
            <List key={key} onClick={() => changePage(item)}>
              {convertFirstStr(item.title)}
            </List>
          ))}
        </ListBox>
      </Sidebar>

      {/* Header */}
      <Top>
        <AppsSvg
          width={30}
          height={30}
          color="var(--main)"
          onClick={() => setIsOpenMenu(true)}
        ></AppsSvg>
        <Title>{title}</Title>
        <Theme></Theme>
      </Top>

      {/* 본문 */}
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default TestLayout;

const Wrapper = styled.div``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  height: 60px;
  padding: 0px 24px;
`;
const Title = styled.h1`
  font: var(--headline24);
`;
const Content = styled.div`
  min-width: 360px;
  padding: 16px;
  margin-bottom: 200px;
  border-top: 1px solid var(--sectionLine);
`;
const Sidebar = styled.div<any>`
  position: absolute;
  top: 0px;
  left: ${(props) => props.left};
  width: 200px;
  height: 100vh;
  z-index: 20;
  background-color: var(--box);
  border: 1px solid var(--sectionLine);
  transition: left 0.2s ease;
  & * {
    background-color: inherit;
  }
`;
const ListBox = styled.div`
  padding: 8px 0px;
`;
const List = styled.p`
  font: var(--body18);
  cursor: pointer;
  padding: 4px 8px;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: var(--selected);
  }
`;
