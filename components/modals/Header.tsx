import styled from "@emotion/styled";
import React, { Fragment } from "react";

import BackSvg from "@/images/arrow_back_ios.svg";
import CloseSvg from "@/images/close.svg";

type Props = {
  title?: string;
  back?: () => void;
  close?: () => void;
};

const Header = ({ title, back, close }: Props) => {
  if (!title && !close && !back) return null;
  return (
    <Wrapper>
      <Icon>{back && <BackSvg onClick={back}></BackSvg>}</Icon>
      <Title>{title}</Title>
      <Icon>{close && <CloseSvg onClick={close}></CloseSvg>}</Icon>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const Title = styled.p`
  font: var(--bold18);
`;
const Icon = styled.div`
  width: 24px;
  height: 24px;
`;
