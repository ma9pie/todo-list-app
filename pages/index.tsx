import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import Todo from "@/components/home/Todo";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import AddButton from "@/shared/buttons/AddButton";
import EmptyData from "@/shared/EmptyData";
import Loading from "@/shared/Loading";
import { Cluster } from "@/types";

export default function Home() {
  const { user } = useLogin();
  const local = useLocalStorage();
  const { openAddList } = useModal();
  const { updatedAt, getClusters } = useTodo();

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<Cluster[]>([]);

  useEffect(() => {
    (async () => {
      setList(await getClusters());
      setIsLoading(false);
    })();
  }, [user, updatedAt, local.clusters]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading></Loading>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        {list.length === 0 && <EmptyData type="list"></EmptyData>}

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
