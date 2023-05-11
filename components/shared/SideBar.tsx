import styled from "@emotion/styled";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useRecoilValue } from "recoil";

import DashboardSvg from "@/images/dashboard.svg";
import SubjectSvg from "@/images/subject.svg";
import { todoState } from "@/recoil/selectors";
import Dot from "@/shared/Dot";
import { Cluster } from "@/types";

type Props = {};
type RefProps = {
  openSideBar: () => void;
};

const SIDEBAR_WIDTH = 200;

const SideBar = forwardRef((props: Props, ref: Ref<RefProps>) => {
  const todos = useRecoilValue(todoState);

  const [isMount, setIsMount] = useState<boolean>(false);
  const [sideBarLeft, setSideBarLeft] = useState<string>(`${-SIDEBAR_WIDTH}px`);
  const [overlayLeft, setOverlayLeft] = useState<string>("-100vw");
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useImperativeHandle(ref, () => ({
    openSideBar,
  }));

  // 사이드바 열기
  const openSideBar = () => {
    setSideBarLeft("0px");
    setOverlayLeft("0px");
    setOpacity(calcOpacity(0));
  };

  // 사이드바 닫기
  const closeSideBar = () => {
    setSideBarLeft(`${-SIDEBAR_WIDTH}px`);
    setOpacity(calcOpacity(-SIDEBAR_WIDTH));
    setTimeout(() => {
      setOverlayLeft("-100vw");
    }, 200);
  };

  // 투명도 계산
  const calcOpacity = (x: number) => {
    return ((x + SIDEBAR_WIDTH) / SIDEBAR_WIDTH) * 0.4;
  };

  if (!isMount) return null;

  return (
    <Wrapper>
      <Overlay
        left={overlayLeft}
        opacity={opacity}
        onClick={closeSideBar}
      ></Overlay>
      <Content left={sideBarLeft} width={`${SIDEBAR_WIDTH}px`}>
        <SubtitleBox>
          <Div>
            <DashboardSvg></DashboardSvg>
            <Subtitle>ALL</Subtitle>
          </Div>
        </SubtitleBox>

        <SubtitleBox>
          <Div>
            <SubjectSvg></SubjectSvg>
            <Subtitle>LIST</Subtitle>
          </Div>
        </SubtitleBox>
        {todos.map((todo: Cluster) => (
          <ListBox key={todo.clusterId}>
            <Div>
              <DotWrapper>
                <Dot color={todo.color}></Dot>
              </DotWrapper>
              <Text>{todo.title}</Text>
            </Div>
            <SubText>{todo.tasks.length}</SubText>
          </ListBox>
        ))}
      </Content>
    </Wrapper>
  );
});

export default SideBar;

SideBar.displayName = "SideBar";

const Wrapper = styled.div``;
const Overlay = styled.div<any>`
  position: fixed;
  top: 0px;
  left: ${(props) => props.left};
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
`;
const Content = styled.div<any>`
  position: fixed;
  top: 0px;
  width: ${(props) => props.width};
  height: 100vh;
  left: ${(props) => props.left};
  transition: left 0.2s ease-in-out;
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
  z-index: 2;
`;
const SubtitleBox = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--sectionLine);
  cursor: pointer;
`;
const Subtitle = styled.p`
  font: var(--medium16);
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 16px;
  cursor: pointer;
`;
const Text = styled.p`
  font: var(--normal14);
  width: 100px;
`;
const SubText = styled.p`
  font: var(--normal14);
  color: var(--sub);
`;
const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
