import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import TestLayout from "@/layouts/TestLayout";
import axiosUtils from "@/utils/axios";

function Components() {
  useEffect(() => {
    axiosUtils.get("/api/todo/list").then((res) => {});
  }, []);

  useEffect(() => {
    const container = [
      {
        id: "2h4hrj",
        title: "오늘 해야할 일",
        color: "red",
        pinned: false,
        created: "",
      },
      {
        id: "fsg324f",
        title: "내일 해야할 일",
        color: "blue",
        pinned: false,
        created: "",
      },
    ];

    const task = [
      {
        id: "asffg3a",
        containerId: "2h4hrj",
        content: "react 공부",
        done: false,
        note: "",
        subTask: [
          {
            content: "useState",
            done: false,
          },
          {
            content: "useEffect",
            done: false,
          },
        ],
      },
      {
        id: "fasdq2",
        containerId: "2h4hrj",
        content: "ts 공부",
        done: false,
        note: "",
        subTask: [],
      },
      {
        id: "wzzz442",
        containerId: "fsg324f",
        content: "redux 공부",
        done: false,
        note: "",
        subTask: [],
      },
    ];
  }, []);

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
