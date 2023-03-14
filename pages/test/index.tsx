import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/layouts/TestLayout";
import axios from "@/utils/axios";

function Components() {
  useEffect(() => {
    axios.get("/api/todo/list").then((res) => {});
  }, []);

  return (
    <Wrapper>
      <Title>Overview</Title>
      <Text>This is component collection page.</Text>
      <Text>
        Frequently used components are classified by list and developed.
      </Text>
      <input autoComplete="off" inputMode="decimal" type="text"></input>
      <input
        _ngcontent-lbw-c39=""
        autoComplete="off"
        inputMode="decimal"
        maxLength="25"
        type="text"
        id="bid_order_form_price"
        class="ng-untouched ng-pristine ng-valid"
      ></input>
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
