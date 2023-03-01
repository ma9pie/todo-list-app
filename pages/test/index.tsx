import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/layouts/TestLayout";

function Components() {
  return (
    <Wrapper>
      <Title>Overview</Title>
      <Text>This is component collection page.</Text>
      <Text>
        Frequently used components are classified by list and developed.
      </Text>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div``;
const Title = styled.p`
  font: var(--medium20);
  margin-bottom: 24px;
`;
const Text = styled.p`
  font: var(--normal14);
`;
