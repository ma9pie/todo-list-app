import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";
import AddButton from "@/shared/buttons/AddButton";
import DoneButton from "@/components/shared/buttons/DoneButton";
import Button from "@/shared/buttons/index";

function Components() {
  return (
    <Wrapper>
      <Button>button</Button>
      <Button disabled>disabled button</Button>
      <AddButton></AddButton>
      <DoneButton></DoneButton>
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
