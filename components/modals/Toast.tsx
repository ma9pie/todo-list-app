import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";

import Text from "@/components/common/Text";
import useModal from "@/hooks/useModal";
import CheckSvg from "@/images/check.svg";
import ErrorSvg from "@/images/error_outline.svg";
import WarningSvg from "@/images/warning_amber.svg";
import { ModalProps, ToastStatus } from "@/types";

let pid: ReturnType<typeof setTimeout>;

const Toast = (props: ModalProps) => {
  const { closeModal } = useModal();

  const [isIOS, setIsIOS] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      setIsIOS(true);
    }
  }, []);

  useEffect(() => {
    setIsOpen(true);
    clearTimeout(pid);
    pid = setTimeout(() => {
      close();
    }, 2000);
  }, []);

  const close = () => {
    setIsOpen(false);
    closeModal(props.id);
  };

  const getSvg = useCallback((status: ToastStatus | undefined) => {
    switch (status) {
      case ToastStatus.Success:
        return (
          <CheckSvg
            className="fill-green400"
            width="24px"
            height="24px"
          ></CheckSvg>
        );
      case ToastStatus.Error:
        return (
          <ErrorSvg
            className="fill-red400"
            width="24px"
            height="24px"
          ></ErrorSvg>
        );
      case ToastStatus.Warn:
        return (
          <WarningSvg
            className="fill-yellow400"
            width="24px"
            height="24px"
          ></WarningSvg>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Wrapper bottom={isIOS ? "60px" : "26px"}>
      <Content
        className={
          isOpen === null
            ? cx(hide)
            : isOpen
            ? cx(openAnimation)
            : cx(closeAnimation)
        }
        onClick={close}
      >
        <SvgWrapper>{getSvg(props.status)}</SvgWrapper>
        <TextBox>
          {props.message?.split("\n").map((message: string, key: number) => (
            <Text key={key} s14 medium color="white">
              {message}
            </Text>
          ))}
        </TextBox>
      </Content>
    </Wrapper>
  );
};

export default Toast;

Toast.defaultProps = {
  status: ToastStatus.None,
  message: "",
  isOpen: null,
};

const openAnimation = css`
  animation: open-toast 0.2s ease forwards;
`;
const closeAnimation = css`
  animation: close-toast 0.1s ease forwards;
`;
const hide = css`
  visibility: hidden;
`;

const Wrapper = styled.div<{ bottom: string }>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  left: 0px;
  bottom: ${(props) => props.bottom};
  width: 100%;
  height: 100vh;
  z-index: 999;
  pointer-events: none;
  user-select: none;
  background-color: transparent;
  & * {
    background-color: transparent;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 340px;
  margin: 0px 16px;
  padding: 16px;
  border-radius: 15px;
  background-color: var(--toast) !important;
  backdrop-filter: blur(5px);
  pointer-events: auto;
  cursor: pointer;
`;
const SvgWrapper = styled.div``;
const TextBox = styled.div``;
