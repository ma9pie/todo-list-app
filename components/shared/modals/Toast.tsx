import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";

import CheckSvg from "@/images/check.svg";
import ErrorSvg from "@/images/error_outline.svg";
import WarningSvg from "@/images/warning_amber.svg";

type Props = {
  type: string;
  message: string;
  isOpen: boolean;
  unmount: Function;
  onRequestClose: Function;
};

let pid: ReturnType<typeof setTimeout>;
function Toast(props: Props) {
  const [isIOS, setIsIOS] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      setIsIOS(true);
    }
  }, []);

  useEffect(() => {
    let delay = 0;
    delay = props.isOpen ? 100 : 0;
    setIsOpen(isOpen ? false : null);
    setTimeout(() => {
      setIsOpen(true);
    }, delay);
    clearTimeout(pid);
    pid = setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        props.unmount();
      }, 100);
    }, 2000);
    return () => {
      clearTimeout(pid);
      setIsOpen(null);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      props.unmount();
    }, 200);
  };

  const getSvg = useCallback((type: string) => {
    switch (type) {
      case "success":
        return (
          <CheckSvg
            width="24px"
            height="24px"
            className={successColor}
          ></CheckSvg>
        );
      case "error":
        return (
          <ErrorSvg
            width="24px"
            height="24px"
            className={errorColor}
          ></ErrorSvg>
        );
      case "warn":
        return (
          <WarningSvg
            width="24px"
            height="24px"
            className={warnColor}
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
            ? cx(HideToastPopup)
            : isOpen
            ? cx(openToast)
            : cx(CloseToastPopup)
        }
        onClick={close}
      >
        <SvgWrapper>{getSvg(props.type)}</SvgWrapper>
        <TextBox>
          {props.message?.split("\n").map((message: string, key: number) => (
            <Text key={key}>{message}</Text>
          ))}
        </TextBox>
      </Content>
    </Wrapper>
  );
}

export default React.memo(Toast);

Toast.defaultProps = {
  type: "",
  message: "",
  isOpen: null,
  unmount: () => {},
  onRequestClose: () => {},
};

const openToast = css`
  animation: open-toast 0.2s ease forwards;
`;
const CloseToastPopup = css`
  animation: close-toast 0.1s ease forwards;
`;
const HideToastPopup = css`
  visibility: hidden;
`;
const successColor = css`
  path {
    fill: var(--green400);
  }
`;
const errorColor = css`
  path {
    fill: var(--red400);
  }
`;
const warnColor = css`
  path {
    fill: var(--yellow400);
  }
`;
const Wrapper = styled.div<any>`
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
  background-color: transparent;
  & * {
    background-color: transparent;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 340px;
  margin: 0px;
  padding: 16px;
  border-radius: 15px;
  background-color: var(--toast) !important;
  backdrop-filter: blur(5px);
  pointer-events: auto;
  cursor: pointer;
`;
const SvgWrapper = styled.div``;
const TextBox = styled.div``;
const Text = styled.p`
  font: var(--normal14);
  color: white;
`;
