import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

import useFixedScreen from "@/hooks/useFixedScreen";
import useModal from "@/hooks/useModal";
import { ModalProps } from "@/types";

const Modal = (props: ModalProps) => {
  const { closeModal } = useModal();

  useFixedScreen("modal");

  useEffect(() => {
    props.onAfterOpen && props.onAfterOpen();
    return () => props.onAfterClose && props.onAfterClose();
  }, []);

  // Close modal
  const close = () => {
    closeModal(props.id);
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
        padding={props.padding}
        className={props.isOpen ? fadeIn : fadeOut}
      >
        {props.component && props.component()}
      </Container>
    </Wrapper>
  );
};

export default Modal;

Modal.defaultProps = {
  isOpen: false,
  top: "50%",
  left: "50%",
  padding: "16px",
  component: () => {},
  onAfterOpen: () => {},
  onAfterClose: () => {},
};

const fadeIn = css`
  animation: fade-in 0.2s ease-in-out forwards;
`;
const fadeOut = css`
  animation: fade-out 0.2s ease-in-out forwards;
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
const Container = styled.div<{ top?: string; left?: string; padding?: string }>`
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  padding: ${(props) => props.padding};
  width: 80%;
  min-width: 240px;
  max-width: 400px;
  gap: 16px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--bg);
  transform: translate(-50%, -50%);
  z-index: 999;
`;
