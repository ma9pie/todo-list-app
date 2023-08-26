import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import useTodo from "@/hooks/useTodo";
import TrashCanSvg from "@/images/trash_can.svg";
import CheckBox from "@/shared/CheckBox";
import TaskInput from "@/shared/inputs/TaskInput";
import { Task } from "@/types";

const Todo = () => {
  const router = useRouter();

  const { clusters, getCluster, setClusters } = useTodo();

  const [clusterId, setClusterId] = useState("");
  const [completedList, setCompletedList] = useState<Task[]>([]);
  const [uncompletedList, setUncompletedList] = useState<Task[]>([]);

  useEffect(() => {
    const { id } = router.query;
    if (!id || typeof id === "object") return;
    setClusterId(id);
  }, [router.query]);

  useEffect(() => {
    const _completedList: Task[] = [];
    const _uncompletedList: Task[] = [];
    const tasks = getCluster(clusterId)?.tasks || [];
    tasks.map((item) => {
      if (item.completed) {
        _completedList.push(item);
      } else {
        _uncompletedList.push(item);
      }
    });
    setCompletedList(_completedList);
    setUncompletedList(_uncompletedList);
  }, [clusterId, clusters]);

  const changeTaskStatus = (taskId: string) => {
    const _clusters = clusters.map((item) => {
      return { ...item };
    });
    const cluster = _clusters.find((item) => item.clusterId === clusterId);
    if (!cluster) return;
    cluster.tasks = cluster.tasks.map((item) => {
      if (item.taskId === taskId) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    setClusters(_clusters);
  };

  const deleteTask = (taskId: string) => {
    const _clusters = clusters.map((item) => {
      return { ...item };
    });
    const cluster = _clusters.find((item) => item.clusterId === clusterId);
    if (!cluster) return;
    cluster.tasks = cluster.tasks.filter((item) => item.taskId !== taskId);
    setClusters(_clusters);
  };

  return (
    <Wrapper>
      <Content>
        {uncompletedList.map(({ taskId, content }) => (
          <ListBox key={taskId} onClick={() => changeTaskStatus(taskId)}>
            <FlexBox>
              <CheckBox></CheckBox>
              <Text>{content}</Text>
            </FlexBox>
          </ListBox>
        ))}

        {completedList.length > 0 && (
          <DividerWrapper>
            <Divider></Divider>
            <Text color="var(--sub)">Completed Tasks</Text>
          </DividerWrapper>
        )}

        {completedList.map(({ taskId, content }) => (
          <ListBox className="fill-sub" key={taskId}>
            <FlexBox onClick={() => changeTaskStatus(taskId)}>
              <CheckBox checked={true}></CheckBox>
              <Text color="var(--sub)" textDecoration="line-through">
                {content}
              </Text>
            </FlexBox>
            <DeleteIconWrapper onClick={() => deleteTask(taskId)}>
              <TrashCanSvg></TrashCanSvg>
            </DeleteIconWrapper>
          </ListBox>
        ))}
      </Content>
      <TaskInput clusterId={clusterId}></TaskInput>
    </Wrapper>
  );
};

export default Todo;

Todo.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

const Wrapper = styled.div`
  height: calc(100vh - 60px);
`;
const Content = styled.div`
  height: calc(100vh - 120px);
`;
const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  cursor: pointer;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  padding: 16px;
`;
const Text = styled.p<any>`
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.textDecoration};
`;
const DividerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 16px;
  margin: 8px 0px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--sectionLine);
`;
const DeleteIconWrapper = styled.div`
  padding: 16px;
`;
