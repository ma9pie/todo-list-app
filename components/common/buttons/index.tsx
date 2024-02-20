import styled from "@emotion/styled";
import { forwardRef, ReactNode } from "react";

type Props = {
  full?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  height?: number;
  margin?: string;
  onClick?: (...arg: any) => void;
};

const Button = forwardRef((props: Props, ref) => {
  return (
    <span>
      <Wrapper
        ref={ref}
        disabled={props.disabled}
        full={props.full}
        height={props.height}
        margin={props.margin}
        onClick={props.onClick}
      >
        <Inner>{props.children}</Inner>
      </Wrapper>
    </span>
  );
});

export default Button;

Button.defaultProps = {
  full: false,
  disabled: false,
  height: 40,
  onClick: () => {},
};

const Wrapper = styled.button<any>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.full ? "100%" : "auto")};
  margin: ${(props) => props.margin};
  height: ${(props) => `${props.height}px`};
  border: 0 solid transparent;
  border-radius: 12px;
  background-color: var(--blue500);
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.26;
    cursor: default;
  }
  &:active:not([disabled]) {
    background-color: var(--blue700);
  }
  & * {
    color: white;
    background-color: inherit;
  }
`;
const Inner = styled.span``;
