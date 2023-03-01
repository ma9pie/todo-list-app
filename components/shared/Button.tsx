import styled from "@emotion/styled";
import { forwardRef, ReactNode } from "react";

type Props = {
  fullWidth?: boolean;
  children: ReactNode;
  onClick: Function;
};

const Button = forwardRef((props: Props, ref) => {
  return (
    <Wrapper ref={ref} {...props}>
      <Inner>{props.children}</Inner>
    </Wrapper>
  );
});

export default Button;

Button.defaultProps = {
  fullWidth: true,
};

const Wrapper = styled.div<any>`
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
    cursor: not-allowed;
  }
  &:active {
    background-color: var(--blue700);
  }
  & * {
    color: white;
    background-color: inherit;
  }
`;
const Inner = styled.span``;
