import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import Dot from "@/components/common/Dot";
import Text from "@/components/common/Text";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import CloseSvg from "@/images/close.svg";
import DashboardSvg from "@/images/dashboard.svg";
import SettingSvg from "@/images/settings.svg";
import SubjectSvg from "@/images/subject.svg";
import { Cluster } from "@/types";

type Props = {};
type RefProps = {
  openSideBar: () => void;
};

const SIDEBAR_WIDTH = 200;

const SideBar = forwardRef((props: Props, ref: Ref<RefProps>) => {
  const { todoList } = useTodo();
  const { openSettingsModal } = useModal();
  const { trackViewSideBar } = useTrackEvent();

  const router = useRouter();

  const [isMount, setIsMount] = useState(false);
  const [sideBarRight, setSideBarRight] = useState<string>(
    `${-SIDEBAR_WIDTH}px`
  );
  const [overlayRight, setOverlayRight] = useState<string>("-100vw");
  const [opacity, setOpacity] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    openSideBar,
  }));

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    closeSideBar();
  }, [router.pathname]);

  // 사이드바 열기
  const openSideBar = () => {
    trackViewSideBar();
    setSideBarRight("0px");
    setOverlayRight("0px");
    setOpacity(calcOpacity(0));
  };

  // 사이드바 닫기
  const closeSideBar = () => {
    setSideBarRight(`${-SIDEBAR_WIDTH}px`);
    setOpacity(calcOpacity(-SIDEBAR_WIDTH));
    setTimeout(() => {
      setOverlayRight("-100vw");
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
        right={overlayRight}
        opacity={opacity}
        onClick={closeSideBar}
      ></Overlay>
      <Content right={sideBarRight} width={`${SIDEBAR_WIDTH}px`}>
        <Div>
          <SubtitleBox>
            <Link href="/" onClick={closeSideBar}>
              <FlexBox>
                <DashboardSvg></DashboardSvg>
                <Text medium>ALL</Text>
              </FlexBox>
            </Link>
            <CloseIconWrapper onClick={closeSideBar}>
              <CloseSvg width={32} height={32}></CloseSvg>
            </CloseIconWrapper>
          </SubtitleBox>

          <Divider></Divider>

          <SubtitleBox>
            <FlexBox>
              <SubjectSvg className="fill-sub"></SubjectSvg>
              <Text medium color="var(--sub)">
                LIST
              </Text>
            </FlexBox>
          </SubtitleBox>

          <Divider></Divider>

          <ListContainer className="scroll-y">
            {todoList.map(({ clusterId, color, title, tasks }: Cluster) => (
              <Link
                key={clusterId}
                href={`/todo/${clusterId}`}
                onClick={closeSideBar}
              >
                <ListBox selected={clusterId === router.query.id}>
                  <FlexBox>
                    <DotWrapper>
                      <Dot color={color}></Dot>
                    </DotWrapper>
                    <Title>{title}</Title>
                  </FlexBox>
                  <Text s14 color="var(--sub)">
                    {tasks.length}
                  </Text>
                </ListBox>
              </Link>
            ))}
          </ListContainer>
        </Div>
        <Bottom>
          <Divider></Divider>
          <SubtitleBox onClick={openSettingsModal}>
            <FlexBox>
              <SettingSvg className="fill-sub"></SettingSvg>
              <Text medium color="var(--sub)">
                SETTING
              </Text>
            </FlexBox>
          </SubtitleBox>
        </Bottom>
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
  right: ${(props) => props.right};
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
`;
const Content = styled.div<any>`
  position: fixed;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => props.width};
  height: 100vh;
  right: ${(props) => props.right};
  transition: right 0.2s ease-in-out;
  background-color: var(--bg);
  z-index: 2;
`;
const SubtitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 8px;
`;
const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
const Divider = styled.div`
  border-bottom: 1px solid var(--sectionLine);
`;
const Div = styled.div``;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ListContainer = styled.div`
  height: calc(100vh - 180px);
`;
const ListBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 8px;
  background-color: ${(props) => props.selected && "var(--box)"};
  cursor: pointer;
  &:hover {
    background-color: var(--box);
  }
  & * {
    background-color: inherit;
  }
`;
const Title = styled.p`
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
const Bottom = styled.div`
  cursor: pointer;
`;
