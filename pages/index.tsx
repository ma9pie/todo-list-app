import styled from "@emotion/styled";
import type { ReactElement } from "react";

import AddList from "@/components/AddList";
import Add from "@/components/shared/buttons/Add";
import Todo from "@/components/Todo";
import HomeLayout from "@/layouts/HomeLayout";
import modalUtils from "@/utils/modalUtils";
export default function Home() {
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
        {todo.map((data, key) => (
          <Todo key={data.id} {...data}></Todo>
        ))}
      </Container>
      <AddWrapper>
        <Add onClick={openAddList}></Add>
      </AddWrapper>
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
const AddWrapper = styled.div`
  position: absolute;
  left: max(96vw - 60px, 190px);
  bottom: 2vh;
  background-color: transparent;
  & * {
    background-color: transparent;
  }
`;
