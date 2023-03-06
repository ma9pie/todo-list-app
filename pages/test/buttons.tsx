import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import Add from "@/components/shared/buttons/Add";
import Done from "@/components/shared/buttons/Done";
import Button from "@/components/shared/buttons/index";
import TestLayout from "@/layouts/TestLayout";

function Components() {
  return (
    <Wrapper>
      <Button></Button>
      <Add></Add>
      <Done></Done>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
`;
