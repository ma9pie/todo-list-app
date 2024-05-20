import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

import Text from "@/components/common/Text";
import useFixedScreen from "@/hooks/useFixedScreen";
import useModal from "@/hooks/useModal";
import { ModalProps } from "@/types";

const ConfirmModal = (props: ModalProps) => {
  const { closeModal } = useModal();

  useFixedScreen("confirm");

  useEffect(() => {
    props.onAfterOpen && props.onAfterOpen();
    return () => props.onAfterClose && props.onAfterClose();
  }, []);

  // Close modal
  const close = () => {
    closeModal(props.id);
  };

  // Click confirm
  const onClickConfirm = () => {
    props.onRequestConfirm && props.onRequestConfirm();
    close();
  };

  return (
    <Wrapper>
      <Overlay
        onClick={close}
        className={props.isOpen ? fadeIn : fadeOut}
      ></Overlay>
      <Container
        top={props.top}
        left={props.left}
        className={props.isOpen ? fadeIn : fadeOut}
      >
        <Top>
          <Text s18 bold center>
            {props.title}
          </Text>
        </Top>
        <Content>
          {props.component && props.component()}
          {props.message &&
            props.message.split("\n").map((text: string, idx: number) => (
              <Text s14 key={idx}>
                {text}
              </Text>
            ))}
        </Content>
        <ButtonBox>
          <SubButton onClick={close}>{props.cancelBtnText}</SubButton>
          <MainButton onClick={onClickConfirm}>
            {props.confirmBtnText}
          </MainButton>
        </ButtonBox>
      </Container>
    </Wrapper>
  );
};

export default ConfirmModal;

ConfirmModal.defaultProps = {
  isOpen: false,
  top: "50%",
  left: "50%",
  title: "Notice",
  message: "",
  confirmBtnText: "Confirm",
  cancelBtnText: "Cancle",
  component: () => {},
  onAfterOpen: () => {},
  onAfterClose: () => {},
  onRequestConfirm: () => {},
};

const fadeIn = css`
  animation: fade-in 0.2s ease-in-out forwards;
`;
const fadeOut = css`
  animation: fade-out 0.2s ease-in-out forwards;
`;
const Wrapper = styled.div``;
const Overlay = styled.div<any>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: var(--overlay);
`;
const Container = styled.div<{ top?: string; left?: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  min-width: 240px;
  gap: 24px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--bg);
  transform: translate(-50%, -50%);
  z-index: 999;
`;
const Top = styled.div`
  width: 100%;
  margin-top: 16px;
`;
const Content = styled.div`
  width: 80%;
  max-width: 400px;
  max-height: 1000px;
  padding: 0px 16px;
  text-align: center;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const MainButton = styled.button`
  font-size: 14px;
  width: 100%;
  height: 40px;
  border: 0px;
  color: white;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
  background-color: var(--blue500);
  &:hover {
    background-color: var(--blue700);
  }
`;
const SubButton = styled.button`
  font-size: 14px;
  width: 100%;
  height: 40px;
  border: 0px;
  transition: background-color 0.15s ease-in-out;
  background-color: var(--box);
  &:hover {
    background-color: var(--selected);
  }
  cursor: pointer;
`;
