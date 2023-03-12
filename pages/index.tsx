import styled from "@emotion/styled";
import moment from "moment";
import type { ReactElement } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Todo from "@/components/home/Todo";
import Add from "@/components/shared/buttons/Add";
import Button from "@/components/shared/buttons/index";
import AddList from "@/components/shared/modals/contents/AddList";
import HomeLayout from "@/layouts/HomeLayout";
import { clusterState, taskState } from "@/recoil/atom";
import { todoState } from "@/recoil/selector";
import { Cluster, Task } from "@/types";
import commonUtils from "@/utils/commonUtils";
import modalUtils from "@/utils/modalUtils";
export default function Home() {
  const [todos, setTodos] = useState([]);

  const [clusters, setClusters] = useRecoilState(clusterState);
  const [tasks, setTasks] = useRecoilState(taskState);
  const todo = useRecoilValue(todoState);

  const addCluster = (title: string, color: string) => {
    console.log("addCluster", clusters);
    const result = clusters.concat({
      clusterId: commonUtils.uid(),
      title: title,
      color: color,
      pinned: false,
      created: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: [],
    });
    setClusters(result);
  };

  // todo 조회
  const getTodos = () => {
    console.log("getTodos", clusters);
    const tasksMap = new Map();
    const tmpTodos = [].concat(clusters);

    tasks.map((task: Task) => {
      const cluster = tasksMap.get(task.clusterId);
      if (cluster) {
        tasksMap.set(task.clusterId, cluster.concat(task));
      } else {
        tasksMap.set(task.clusterId, [task]);
      }
    });

    tmpTodos.map((cluster: Cluster) => {
      const tmp = { ...cluster };
      tmp.tasks = tasksMap.get(tmp.clusterId) || [];
      return tmp;
    });
    setTodos(tmpTodos);
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

  useEffect(() => {
    getTodos();
  }, [clusters, tasks]);

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
        <Init>
          <Button onClick={() => addCluster("test", "red")}>데이터 추가</Button>
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
