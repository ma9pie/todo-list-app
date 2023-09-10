import { cloneDeep } from "lodash";
import { useRecoilState } from "recoil";

import { firestore } from "@/firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLogin from "@/hooks/useLogin";
import useTrackEvent from "@/hooks/useTrackEvent";
import {
  isLoadingTodoListState,
  todoListState,
  updatedAtState,
} from "@/recoil/atoms";
import { Cluster, Task } from "@/types";
import { createUid, getCurrentTime } from "@/utils";

const useTodo = () => {
  const { userKey } = useLogin();
  const local = useLocalStorage();
  const { trackRequest } = useTrackEvent();

  const [updatedAt, setUpdatedAt] = useRecoilState(updatedAtState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isLoadingTodoList, setIsLoadingTodoList] = useRecoilState(
    isLoadingTodoListState
  );

  // Clusters 조회
  const getClusters = async () => {
    try {
      if (userKey) {
        trackRequest("getClusters");
        const clusters = await firestore
          .collection("clusters")
          .doc(userKey)
          .get();
        const clustersData = clusters.data();
        if (!clustersData) return [];
        return clustersData.clusters;
      } else {
        return cloneDeep(local.clusters);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Clusters 설정
  const setClusters = async (clusters: Cluster[]) => {
    if (userKey) {
      const _updatedAt = getCurrentTime();
      trackRequest("setClusters");
      await firestore
        .collection("clusters")
        .doc(userKey)
        .set({ clusters, updatedAt: _updatedAt });
      setUpdatedAt(_updatedAt);
    } else {
      local.setClusters(clusters);
    }
  };

  // Cluster 추가
  const addCluster = async (title: string, color: string) => {
    const clusters = await getClusters();
    const _clusters = clusters.concat({
      clusterId: createUid(),
      title,
      color,
      pinned: false,
      createdAt: getCurrentTime(),
      tasks: [],
    });
    setClusters(_clusters);
  };

  // Cluster 수정
  const editCluster = async (
    clusterId: string,
    title: string,
    color: string
  ) => {
    const clusters = await getClusters();
    const _clusters = [...clusters];
    const cluster = _clusters.find((item) => item.clusterId === clusterId);
    if (!cluster) return;
    cluster.title = title;
    cluster.color = color;
    setClusters(_clusters);
  };

  // Cluster 제거
  const removeCluster = async (clusterId: string) => {
    const clusters = await getClusters();
    const _clusters = clusters.filter(
      (item: Cluster) => item.clusterId !== clusterId
    );
    setClusters(_clusters);
  };

  // Tasks 조회
  const getTasks = async (clusterId: string) => {
    const clusters = await getClusters();
    const cluster = clusters.find(
      (item: Cluster) => item.clusterId === clusterId
    );
    return cluster ? cluster.tasks : [];
  };

  // Task 추가
  const addTask = async (clusterId: string, input: string) => {
    const clusters = await getClusters();
    const cluster = clusters.find(
      (item: Cluster) => item.clusterId === clusterId
    );
    if (!cluster) return false;
    cluster.tasks = cluster.tasks.concat({
      clusterId: clusterId,
      taskId: createUid(),
      content: input,
      completed: false,
      createdAt: getCurrentTime(),
    });
    setClusters(clusters);
    return true;
  };

  // Task 상태 변경
  const changeTaskStatus = async (clusterId: string, taskId: string) => {
    const clusters = await getClusters();
    const cluster = clusters.find(
      (item: Cluster) => item.clusterId === clusterId
    );
    if (!cluster) return;
    cluster.tasks = cluster.tasks.map((item: Task) => {
      if (item.taskId === taskId) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    setClusters(clusters);
  };

  // Task 삭제
  const removeTask = async (clusterId: string, taskId: string) => {
    const clusters = await getClusters();
    const cluster = clusters.find(
      (item: Cluster) => item.clusterId === clusterId
    );
    if (!cluster) return;
    cluster.tasks = cluster.tasks.filter(
      (item: Task) => item.taskId !== taskId
    );
    setClusters(clusters);
  };

  return {
    updatedAt,
    todoList,
    isLoadingTodoList,
    setTodoList,
    setIsLoadingTodoList,

    getClusters,
    addCluster,
    editCluster,
    removeCluster,
    getTasks,
    addTask,
    changeTaskStatus,
    removeTask,
  };
};

export default useTodo;
