import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";
import useFirebase from "@/hooks/useFirebase";
import Button from "@/shared/buttons/index";

function Components() {
  const { setMockData } = useFirebase();

  return (
    <Wrapper>
      <Button onClick={setMockData}>setMockData</Button>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div``;
