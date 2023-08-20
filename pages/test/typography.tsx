import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/components/layouts/TestLayout";

function Components() {
  return (
    <Wrapper>
      <TextBox>
        <P font="var(--bold24)">bold24</P>
        <P font="var(--bold20)">bold20</P>
        <P font="var(--bold18)">bold18</P>
        <P font="var(--bold16)">bold16</P>
        <P font="var(--bold14)">bold14</P>
      </TextBox>

      <TextBox>
        <P font="var(--medium20)">medium20</P>
        <P font="var(--medium18)">medium18</P>
        <P font="var(--medium16)">medium16</P>
        <P font="var(--medium14)">medium14</P>
        <P font="var(--medium12)">medium12</P>
      </TextBox>

      <TextBox>
        <P font="var(--normal18)">normal18</P>
        <P font="var(--normal16)">normal16</P>
        <P font="var(--normal14)">normal14</P>
        <P font="var(--normal12)">normal12</P>
        <P font="var(--normal10)">normal10</P>
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
const P = styled.div<any>`
  font: ${(props) => props.font};
`;
