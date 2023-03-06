import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

type Props = {
  isOpen: boolean;
  top: string;
  left: string;
  padding: string;
  component: Function;
  onAfterOpen: Function;
  onAfterClose: Function;
  onRequestClose: Function;
};

function Modal(props: Props) {
  useEffect(() => {
    props.onAfterOpen();
    return () => props.onAfterClose();
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
        {props.component()}
      </Container>
    </Wrapper>
  );
}

export default Modal;

Modal.defaultProps = {
  isOpen: false,
  top: "50%",
  left: "50%",
  padding: "0px",
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  padding: ${(props) => props.padding};
  min-width: 240px;
  gap: 16px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--bg);
  transform: translate(-50%, -50%);
  z-index: 999;
`;
