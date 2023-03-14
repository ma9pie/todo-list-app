import styled from "@emotion/styled";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import AddList from "@/components/home/AddList";
import Todo from "@/components/home/Todo";
import Add from "@/components/shared/buttons/Add";
import Button from "@/components/shared/buttons/index";
import Loading from "@/components/shared/Loading";
import HomeLayout from "@/layouts/HomeLayout";
import { clusterState, taskState } from "@/recoil/atoms";
import { todoState } from "@/recoil/selectors";
import modalUtils from "@/utils/modalUtils";
export default function Home() {
  const [clusters, setClusters] = useRecoilState(clusterState);
  const [tasks, setTasks] = useRecoilState(taskState);
  const todos = useRecoilValue(todoState);

  const [list, setList] = useState([]);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    setList(todos);
  }, [clusters, tasks, todos]);

  // 할일 추가창 열기
  const openAddList = () => {
    modalUtils.openBottomSheet({
      key: "addList",
      title: "Add List",
      component: () => (
        <AddList clusters={clusters} setClusters={setClusters}></AddList>
      ),
    });
  };

  // 데이터 초기화
  const initData = () => {
    modalUtils.openConfirm({
      message: "데이터를 초기화 하시겠습니까?",
      onRequestConfirm: () => {
        setClusters([]);
        setTasks([]);
      },
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
        <AddWrapper>
          <Add onClick={openAddList}></Add>
        </AddWrapper>
        <Button onClick={initData}>데이터 초기화</Button>
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
