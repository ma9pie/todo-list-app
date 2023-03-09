import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import AddList from "@/components/AddList";
import Add from "@/components/shared/buttons/Add";
import Button from "@/components/shared/buttons/index";
import Todo from "@/components/Todo";
import HomeLayout from "@/layouts/HomeLayout";
import localUtils from "@/utils/localUtils";
import modalUtils from "@/utils/modalUtils";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(localUtils.getTodos());
  }, []);

  const openAddList = () => {
    modalUtils.openBottomSheet({
      key: "addList",
      title: "Add List",
      component: AddList,
    });
  };

  return (
    <Wrapper>
      <Container>
        {todos.map((todo: any) => (
          <Todo key={todo.clusterId} {...todo}></Todo>
        ))}
        <AddWrapper>
          <Add onClick={openAddList}></Add>
        </AddWrapper>
        <Init>
          <Button onClick={() => localUtils.init()}>데이터 초기화</Button>
        </Init>
      </Container>
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;
const Init = styled.div``;
