import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";

import Button from "@/shared/buttons";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const Process2 = ({ setStep }: Props) => {
  return (
    <Wrapper>
      <Content>content</Content>
      <Button onClick={() => setStep(2)}>다음</Button>
    </Wrapper>
  );
};

export default Process2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--box);
  & * {
    background-color: var(--box);
  }
`;
