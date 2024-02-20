import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

import Text from "@/components/common/Text";
import useFixedScreen from "@/hooks/useFixedScreen";
import CloseSvg from "@/images/close.svg";
import { ModalProps } from "@/types";

const BottomSheet = (props: ModalProps) => {
  useFixedScreen("bottom-sheet");
  useEffect(() => {
    props.onAfterOpen && props.onAfterOpen();
    return () => props.onAfterClose && props.onAfterClose();
  }, []);

  return (
    <Wrapper>
      <Overlay
        onClick={props.onRequestClose}
        className={props.isOpen ? fadeIn : fadeOut}
      ></Overlay>
      <Container
        className={props.isOpen ? slideUp : slideDown}
        height={props.height}
      >
        <Top>
          <BlankBox></BlankBox>
          <Text s18 bold>
            {props.title}
          </Text>
          <CloseSvg
            width={24}
            height={24}
            onClick={() => props.onRequestClose && props.onRequestClose()}
          ></CloseSvg>
        </Top>
        <Content>{props.component && props.component()} </Content>
      </Container>
    </Wrapper>
  );
};

export default BottomSheet;

BottomSheet.defaultProps = {
  height: "auto",
  isOpen: false,
  title: "Notice",
  component: () => {},
  onAfterOpen: () => {},
  onAfterClose: () => {},
  onRequestClose: () => {},
};

const fadeIn = css`
  animation: fade-in 0.2s ease-in-out forwards;
`;
const fadeOut = css`
  animation: fade-out 0.2s ease-in-out forwards;
`;
const slideUp = css`
  animation: slide-up 0.2s ease-in-out forwards;
`;
const slideDown = css`
  animation: slide-down 0.2s ease-in-out forwards;
`;
const Wrapper = styled.div``;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: var(--overlay);
`;
const Container = styled.div<{ height?: string }>`
  position: fixed;
  bottom: 0px;
  width: 100%;
  min-width: 240px;
  height: ${(props) => props.height};
  max-height: 100vh;
  border-radius: 25px 25px 0px 0px;
  padding: 24px;
  z-index: 999;
  & * {
    overscroll-behavior: contain;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const BlankBox = styled.div`
  width: 16px;
`;
const Content = styled.div`
  padding-right: 8px;
  // 전체높이 - top영역 - 아래쪽 여백
  max-height: calc(100vh - 24px - 48px - 24px);
  overflow-y: scroll;
`;
