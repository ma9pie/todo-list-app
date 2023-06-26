import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

import Button from "@/shared/buttons";

type Props = {
  close: () => void;
};

const Process3 = ({ close }: Props) => {
  return (
    <Wrapper>
      <Content>
        <Image
          src="https://static.toss.im/3d-emojis/u1F47B-u1F480.png"
          width={200}
          height={200}
          alt="complete"
        ></Image>
      </Content>

      <Text>완료되었어요</Text>

      <Button onClick={close}>완료</Button>
    </Wrapper>
  );
};

export default Process3;

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
  padding: 40px 8px;
`;
const Text = styled.p`
  font: var(--bold16);
  font-weight: 500;
  text-align: center;
`;
