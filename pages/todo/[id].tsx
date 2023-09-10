import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import Dot from "@/components/shared/Dot";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import EditSvg from "@/images/edit.svg";
import TrashCanSvg from "@/images/trash_can.svg";
import CheckBox from "@/shared/CheckBox";
import EmptyData from "@/shared/EmptyData";
import TaskInput from "@/shared/inputs/TaskInput";
import PageLoading from "@/shared/PageLoading";
import { Cluster, Task } from "@/types";

const Todo = () => {
  const router = useRouter();

  const { user } = useLogin();
  const {
    updatedAt,
    isLoadingTodoList,
    getClusters,
    changeTaskStatus,
    removeTask,
  } = useTodo();
  const local = useLocalStorage();
  const { openEditListModal } = useModal();
  const { trackRemoveTask, trackClickCheckbox, trackClickIcon } =
    useTrackEvent();

  const [clusterId, setClusterId] = useState("");
  const [clusterTitle, setClusterTitle] = useState("");
  const [clusterColor, setClusterColor] = useState("");
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
      const clusters = await getClusters();
      const cluster = clusters.find(
        (item: Cluster) => item.clusterId === clusterId
      );
      if (!cluster) return;
      const { title, color, tasks } = cluster;
      tasks.map((item: Task) => {
        if (item.completed) {
          _completedList.push(item);
        } else {
          _uncompletedList.push(item);
        }
      });
      setClusterTitle(title);
      setClusterColor(color);
      setCompletedList(_completedList);
      setUncompletedList(_uncompletedList);
    })();
    return;
  }, [clusterId, user, updatedAt, local.clusters]);

  const toggleStatus = (clusterId: string, taskId: string) => {
    trackClickCheckbox();
    changeTaskStatus(clusterId, taskId);
  };

  const remove = (clusterId: string, taskId: string) => {
    trackRemoveTask();
    removeTask(clusterId, taskId);
  };

  const editList = () => {
    trackClickIcon("Edit");
    openEditListModal({
      clusterId: clusterId,
      prevTitle: clusterTitle,
      prevColor: clusterColor,
    });
  };

  return (
    <Wrapper>
      <Content className="scroll-y">
        {isLoadingTodoList && <PageLoading></PageLoading>}

        <TitleBox>
          <Dot color={clusterColor}></Dot>
          <Text>{clusterTitle}</Text>
          <EditSvg className="fill-sub" onClick={editList}></EditSvg>
        </TitleBox>

        {uncompletedList.concat(completedList).length === 0 && (
          <EmptyData type="task"></EmptyData>
        )}

        {uncompletedList.map(({ taskId, content }) => (
          <ListBox key={taskId}>
            <FlexBox>
              <CheckBox
                onClick={() => toggleStatus(clusterId, taskId)}
              ></CheckBox>
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
            <FlexBox>
              <CheckBox
                checked={true}
                onClick={() => toggleStatus(clusterId, taskId)}
              ></CheckBox>
              <Text color="var(--sub)" textDecoration="line-through">
                {content}
              </Text>
            </FlexBox>
            <DeleteIconWrapper onClick={() => remove(clusterId, taskId)}>
              <TrashCanSvg></TrashCanSvg>
            </DeleteIconWrapper>
          </ListBox>
        ))}
      </Content>

      <Bottom>
        <TaskInput clusterId={clusterId}></TaskInput>
      </Bottom>
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
  height: 100%;
  padding-bottom: 116px;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0px 16px;
  font-weight: 600;
`;
const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  padding: 16px;
  width: calc(100% - 56px);
`;
const Text = styled.p<{ color?: string; textDecoration?: string }>`
  width: calc(100% - 60px);
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.textDecoration};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
`;
const Bottom = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0px;
  width: 100%;
  transform: translateX(-50%);
`;
