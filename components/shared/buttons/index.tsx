import styled from "@emotion/styled";
import { forwardRef, ReactNode } from "react";

type Props = {
  fullWidth?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = forwardRef((props: Props, ref) => {
  return (
    <Wrapper
      ref={ref}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      onClick={props.onClick}
    >
      <Inner>{props.children}</Inner>
    </Wrapper>
  );
});

export default Button;

Button.defaultProps = {
  fullWidth: true,
  disabled: false,
  onClick: () => {},
};

const Wrapper = styled.button<any>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: 56px;
  border: 0 solid transparent;
  border-radius: 16px;
  background-color: var(--blue500);
  font-size: 17px;
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
