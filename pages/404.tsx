import styled from "@emotion/styled";
import React, { ReactElement } from "react";

import Text from "@/components/common/Text";
import DefaultLayout from "@/components/layouts/DefaultLayout";

function Error404() {
  return (
    <Container>
      <TextBox>
        <Number>404</Number>
        <Text s24 medium center color="var(--brandColor)">
          Page Not Found
        </Text>
      </TextBox>
    </Container>
  );
}

export default Error404;

Error404.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

const Container = styled.div`
  position: relative;
  height: calc(100vh - 115px);
`;
const TextBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 8px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const Number = styled.p`
  font-size: 120px;
  font-weight: 600;
  color: var(--brandColor);
`;
