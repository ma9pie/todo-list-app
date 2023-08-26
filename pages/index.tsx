import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import Todo from "@/components/home/Todo";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import AddListModal from "@/components/modals/contents/AddListModal";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import AddButton from "@/shared/buttons/AddButton";
import Loading from "@/shared/Loading";

export default function Home() {
  const { clusters } = useTodo();
  const { openBottomSheet } = useModal();

  const [list, setList] = useState<any[]>([]);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    setList(clusters);
  }, [clusters]);

  // 할일 추가창 열기
  const openAddList = () => {
    openBottomSheet({
      key: "addList",
      title: "AddButton List",
      component: () => <AddListModal></AddListModal>,
    });
  };

  if (!isMount) {
    return (
      <LoadingWrapper>
        <Loading></Loading>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        {list.map((todo: any) => (
          <Todo key={todo.clusterId} {...todo}></Todo>
        ))}

        <Bottom>
          <AddWrapper>
            <AddButton onClick={openAddList}></AddButton>
          </AddWrapper>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
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
  background-color: transparent;
`;
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Bottom = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  gap: 8px;
  background-color: transparent;
`;
