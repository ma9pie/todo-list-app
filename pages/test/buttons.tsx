import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/layouts/TestLayout";
import Add from "@/shared/buttons/Add";
import Done from "@/shared/buttons/Done";
import Button from "@/shared/buttons/index";

function Components() {
  return (
    <Wrapper>
      <Button>button</Button>
      <Button disabled>disabled button</Button>
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
