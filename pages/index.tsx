import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React from "react";

import AddButton from "@/components/common/buttons/AddButton";
import EmptyData from "@/components/common/EmptyData";
import Todo from "@/components/home/Todo";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";

const Home = () => {
  const { todoList } = useTodo();
  const { openAddListModal } = useModal();
  const { trackClickBtn } = useTrackEvent();

  const handleClickAddBtn = () => {
    trackClickBtn("AddList");
    openAddListModal();
  };

  return (
    <Wrapper>
      <Container>
        {todoList.length === 0 && <EmptyData type="list"></EmptyData>}

        {todoList.map((todo: any) => (
          <Todo key={todo.clusterId} {...todo}></Todo>
        ))}

        <Bottom>
          <AddWrapper>
            <AddButton onClick={handleClickAddBtn}></AddButton>
          </AddWrapper>
        </Bottom>
      </Container>
    </Wrapper>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 16px 124px 16px;
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
  background-color: transparent;
`;
const Bottom = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
`;
