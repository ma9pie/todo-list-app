import styled from "@emotion/styled";
import Link from "next/link";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import DashboardSvg from "@/images/dashboard.svg";
import SettingSvg from "@/images/settings.svg";
import SubjectSvg from "@/images/subject.svg";
import Dot from "@/shared/Dot";
import { Cluster } from "@/types";

type Props = {};
type RefProps = {
  openSideBar: () => void;
};

const SIDEBAR_WIDTH = 200;

const SideBar = forwardRef((props: Props, ref: Ref<RefProps>) => {
  const { clusters } = useTodo();
  const { openSettings } = useModal();

  const [isMount, setIsMount] = useState<boolean>(false);
  const [sideBarRight, setSideBarRight] = useState<string>(
    `${-SIDEBAR_WIDTH}px`
  );
  const [overlayRight, setOverlayRight] = useState<string>("-100vw");
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useImperativeHandle(ref, () => ({
    openSideBar,
  }));

  // 사이드바 열기
  const openSideBar = () => {
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
        <div>
          <Link href="/" onClick={closeSideBar}>
            <SubtitleBox>
              <Div>
                <DashboardSvg></DashboardSvg>
                <Subtitle>ALL</Subtitle>
              </Div>
            </SubtitleBox>
          </Link>

          <Divider></Divider>

          <SubtitleBox>
            <Div>
              <SubjectSvg className="fill-sub"></SubjectSvg>
              <Subtitle color="var(--sub)">LIST</Subtitle>
            </Div>
          </SubtitleBox>

          <Divider></Divider>

          {clusters.map(({ clusterId, color, title, tasks }: Cluster) => (
            <Link
              key={clusterId}
              href={`/todo/${clusterId}`}
              onClick={closeSideBar}
            >
              <ListBox>
                <Div>
                  <DotWrapper>
                    <Dot color={color}></Dot>
                  </DotWrapper>
                  <Text>{title}</Text>
                </Div>
                <SubText>{tasks.length}</SubText>
              </ListBox>
            </Link>
          ))}
        </div>
        <Bottom>
          <Divider></Divider>
          <SettingIconWrapper onClick={openSettings}>
            <SettingSvg className="fill-sub"></SettingSvg>
          </SettingIconWrapper>
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
  height: calc(var(--vh, 1vh) * 100);
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
  height: calc(var(--vh, 1vh) * 100);
  right: ${(props) => props.right};
  transition: right 0.2s ease-in-out;
  background-color: var(--bg);
  z-index: 2;
`;
const SubtitleBox = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
`;
const Subtitle = styled.p<any>`
  font: var(--medium16);
  color: ${(props) => props.color};
`;
const Divider = styled.div`
  border-bottom: 1px solid var(--sectionLine);
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
const Bottom = styled.div``;
const SettingIconWrapper = styled.div`
  padding: 16px;
  cursor: pointer;
`;
