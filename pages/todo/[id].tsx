import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLogin from "@/hooks/useLogin";
import useTodo from "@/hooks/useTodo";
import TrashCanSvg from "@/images/trash_can.svg";
import CheckBox from "@/shared/CheckBox";
import EmptyData from "@/shared/EmptyData";
import TaskInput from "@/shared/inputs/TaskInput";
import Loading from "@/shared/Loading";
import { Task } from "@/types";

const Todo = () => {
  const router = useRouter();

  const { user } = useLogin();
  const { updatedAt, getTasks, changeTaskStatus, deleteTask } = useTodo();
  const local = useLocalStorage();

  const [isLoading, setIsLoading] = useState(true);
  const [clusterId, setClusterId] = useState("");
  const [completedList, setCompletedList] = useState<Task[]>([]);
  const [uncompletedList, setUncompletedList] = useState<Task[]>([]);

  useEffect(() => {
    const { id } = router.query;
    if (!id || typeof id === "object") return;
    setClusterId(id);
  }, [router.query]);

  useEffect(() => {
    (async () => {
      if (!clusterId) return;
      const _completedList: Task[] = [];
      const _uncompletedList: Task[] = [];
      const tasks = await getTasks(clusterId);
      tasks.map((item: Task) => {
        if (item.completed) {
          _completedList.push(item);
        } else {
          _uncompletedList.push(item);
        }
      });
      setCompletedList(_completedList);
      setUncompletedList(_uncompletedList);
      setIsLoading(false);
    })();
    return;
  }, [clusterId, user, updatedAt, local.clusters]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading></Loading>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Content>
        {uncompletedList.concat(completedList).length === 0 && (
          <EmptyData type="task"></EmptyData>
        )}

        {uncompletedList.map(({ taskId, content }) => (
          <ListBox
            key={taskId}
            onClick={() => changeTaskStatus(clusterId, taskId)}
          >
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
            <FlexBox onClick={() => changeTaskStatus(clusterId, taskId)}>
              <CheckBox checked={true}></CheckBox>
              <Text color="var(--sub)" textDecoration="line-through">
                {content}
              </Text>
            </FlexBox>
            <DeleteIconWrapper onClick={() => deleteTask(clusterId, taskId)}>
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

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
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
