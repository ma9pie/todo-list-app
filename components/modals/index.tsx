import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

import useFixedScreen from "@/hooks/useFixedScreen";
import { ModalProps } from "@/types";

const Modal = (props: ModalProps) => {
  useFixedScreen("modal");
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
  onRequestClose: () => {},
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
const Container = styled.div<any>`
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  padding: ${(props) => props.padding};
  width: 80%;
  min-width: 240px;
  max-width: 600px;
  gap: 16px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--bg);
  transform: translate(-50%, -50%);
  z-index: 999;
`;
