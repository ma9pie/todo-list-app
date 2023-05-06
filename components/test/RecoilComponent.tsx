import styled from "@emotion/styled";
import React from "react";
import { useRecoilState } from "recoil";

import useModal from "@/hooks/useModal";
import { testState } from "@/recoil/atoms";

const RecoilComponent = () => {
  const modal = useModal();
  const [test, setTest] = useRecoilState(testState);

  return (
    <Wrapper>
      <Title>RecoilComponent</Title>
      <TextBox>{`test : ${test}`}</TextBox>
      <Button
        onClick={() => {
          // modal.openModal({ component: () => <div>123</div> });
          modal.closeModal();
        }}
      >
        details
      </Button>
    </Wrapper>
  );
};

export default RecoilComponent;

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;
  width: 100%;
`;
const Title = styled.p`
  font: var(--bold16);
  color: var(--sub);
`;
const TextBox = styled.div`
  border-radius: 8px;
  background-color: var(--box);
  padding: 8px;
`;
const Button = styled.button`
  height: 24px;
  border: 0px;
  border-radius: 6px;
  background-color: var(--blue500);
  cursor: pointer;
  &:active:not([disabled]) {
    background-color: var(--blue700);
  }
`;
