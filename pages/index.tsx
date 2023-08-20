import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import Todo from "@/components/home/Todo";
import HomeLayout from "@/components/layouts/HomeLayout";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import AddList from "@/modals/contents/AddList";
import Add from "@/shared/buttons/Add";
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
      title: "Add List",
      component: () => <AddList></AddList>,
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
            <Add onClick={openAddList}></Add>
          </AddWrapper>
        </Bottom>
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
`;
