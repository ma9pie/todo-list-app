import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import Todo from "@/components/home/Todo";
import Add from "@/components/shared/buttons/Add";
import Button from "@/components/shared/buttons/index";
import AddList from "@/components/shared/modals/contents/AddList";
import HomeLayout from "@/layouts/HomeLayout";
import localUtils from "@/utils/localUtils";
import modalUtils from "@/utils/modalUtils";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  // todo 조회
  const getTodos = () => {
    setTodos(localUtils.getTodos());
  };

  // 할일 추가창 열기
  const openAddList = () => {
    modalUtils.openBottomSheet({
      key: "addList",
      title: "Add List",
      component: AddList,
      onAfterClose: getTodos,
    });
  };

  // 데이터 초기화
  const initData = () => {
    modalUtils.openConfirm({
      message: "데이터를 초기화 하시겠습니까?",
      onRequestConfirm: () => {
        localUtils.init();
        getTodos();
      },
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
          <Button onClick={initData}>데이터 초기화</Button>
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
