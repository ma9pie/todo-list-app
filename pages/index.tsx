import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import AddList from "@/components/AddList";
import Add from "@/components/shared/buttons/Add";
import Todo from "@/components/Todo";
import HomeLayout from "@/layouts/HomeLayout";
import modalUtils from "@/utils/modalUtils";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  const todo = [
    {
      id: "2h4hrj",
      title: "오늘 해야할 일",
      color: "#64a8ff",
      pinned: false,
      created: "",
      tasks: [
        {
          id: "asffg3a",
          content: "react 공부",
          done: false,
          note: "",
          subTasks: [
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
          content: "ts 공부",
          done: false,
          note: "",
          subTasks: [],
        },
      ],
    },
    {
      id: "fsg324f",
      title: "내일 해야할 일",
      color: "#fb8890",
      pinned: false,
      created: "",
      tasks: [
        {
          id: "wzzz442",
          content: "redux 공부",
          done: false,
          note: "",
          subTasks: [],
        },
      ],
    },
  ];

  const openAddList = () => {
    modalUtils.openBottomSheet({
      key: "addList",
      title: "Add List",
      height: "50%",
      component: AddList,
    });
  };

  return (
    <Wrapper>
      <Container>
        {todo
          .concat(todo)
          .concat(todo)
          .concat(todo)
          .map((data, key) => (
            <Todo key={data.id} {...data}></Todo>
          ))}
        <Test>
          <Add onClick={openAddList}></Add>
        </Test>
      </Container>
      {/* <AddWrapper bottom={isMobile ? "calc(2vh + 60px)" : "2vh"}>
        <Add onClick={openAddList}></Add>
      </AddWrapper> */}
    </Wrapper>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;
const AddWrapper = styled.div<{ bottom: string }>`
  position: absolute;
  left: max(96vw - 60px, 190px);
  bottom: ${(props) => props.bottom};
  background-color: transparent;
`;
const Test = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;
