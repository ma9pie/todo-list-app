import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";

function Components() {
  return (
    <Wrapper>
      <TextBox>
        <Text font="var(--bold24)">bold24</Text>
        <Text font="var(--bold20)">bold20</Text>
        <Text font="var(--bold18)">bold18</Text>
        <Text font="var(--bold16)">bold16</Text>
        <Text font="var(--bold14)">bold14</Text>
      </TextBox>

      <TextBox>
        <Text font="var(--medium20)">medium20</Text>
        <Text font="var(--medium18)">medium18</Text>
        <Text font="var(--medium16)">medium16</Text>
        <Text font="var(--medium14)">medium14</Text>
        <Text font="var(--medium12)">medium12</Text>
      </TextBox>

      <TextBox>
        <Text font="var(--normal18)">normal18</Text>
        <Text font="var(--normal16)">normal16</Text>
        <Text font="var(--normal14)">normal14</Text>
        <Text font="var(--normal12)">normal12</Text>
        <Text font="var(--normal10)">normal10</Text>
      </TextBox>
    </Wrapper>
  );
}

export default Components;

Components.getLayout = function getLayout(page: ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

const Wrapper = styled.div``;
const TextBox = styled.div`
  margin-bottom: 16px;
`;
const Text = styled.div<any>`
  font: ${(props) => props.font};
`;
