import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { firestore } from "@/firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLogin from "@/hooks/useLogin";
import useModal from "@/hooks/useModal";
import useTrackEvent from "@/hooks/useTrackEvent";
import {
  isLoadingTodoListState,
  todoListState,
  updatedAtState,
} from "@/recoil/atoms";
import { Cluster, Message, Task, ToastStatus } from "@/types";
import { createUid, getCurrentTime } from "@/utils";

const useTodo = () => {
  const router = useRouter();

  const { userKey } = useLogin();
  const local = useLocalStorage();
  const { openToast } = useModal();
  const {
    trackRequest,
    trackAddList,
    trackEditList,
    trackRemoveList,
    trackAddTask,
    trackEditTask,
    trackRemoveTask,
    trackServerError,
  } = useTrackEvent();

  const [updatedAt, setUpdatedAt] = useRecoilState(updatedAtState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isLoadingTodoList, setIsLoadingTodoList] = useRecoilState(
    isLoadingTodoListState
  );

  // 데이터 초기화
  const resetData = async () => {
    await setClusters([]);
  };

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
        console.log("\n========== getClusters ==========");
        console.log(clustersData.clusters);
        return clustersData.clusters;
      } else {
        return cloneDeep(local.clusters);
      }
    } catch (err) {
      console.log(err);
      trackServerError("getClusters");
      openToast({
        status: ToastStatus.Error,
        message: Message.SeverError,
      });
    }
  };

  // Clusters 설정
  const setClusters = async (clusters: Cluster[]) => {
    try {
      if (userKey) {
        trackRequest("setClusters");
        const _updatedAt = getCurrentTime();
        await firestore
          .collection("clusters")
          .doc(userKey)
          .set({ clusters, updatedAt: _updatedAt });
        setUpdatedAt(_updatedAt);
      } else {
        local.setClusters(clusters);
      }
    } catch (err) {
      console.log(err);
      trackServerError("setClusters");
      openToast({
        status: ToastStatus.Error,
        message: Message.SeverError,
      });
    }
  };

  // Cluster 추가
  const addCluster = async (title: string, color: string) => {
    try {
      trackAddList();
      const list = cloneDeep(todoList);
      const _list = list.concat({
        clusterId: createUid(),
        title,
        color,
        pinned: false,
        createdAt: getCurrentTime(),
        tasks: [],
      });
      await setClusters(_list);
      setTimeout(() => {
        openToast({
          status: ToastStatus.Success,
          message: Message.ListAdded,
        });
      }, 200);
    } catch (err) {
      console.log(err);
      router.push("/");
      setTimeout(() => {
        openToast({
          status: ToastStatus.Error,
          message: Message.InvalidRequest,
        });
      }, 200);
    }
  };

  // Cluster 수정
  const editCluster = async (
    clusterId: string,
    title: string,
    color: string
  ) => {
    try {
      trackEditList();
      const list = cloneDeep(todoList);
      const cluster = list.find((item) => item.clusterId === clusterId);
      if (!cluster) return;
      cluster.title = title;
      cluster.color = color;
      await setClusters(list);
      setTimeout(() => {
        openToast({
          status: ToastStatus.Success,
          message: Message.ListEdited,
        });
      }, 200);
    } catch (err) {
      console.log(err);
      router.push("/");
      setTimeout(() => {
        openToast({
          status: ToastStatus.Error,
          message: Message.InvalidRequest,
        });
      }, 200);
    }
  };

  // Cluster 제거
  const removeCluster = async (clusterId: string) => {
    trackRemoveList();
    const list = cloneDeep(todoList);
    const _list = list.filter((item: Cluster) => item.clusterId !== clusterId);
    await setClusters(_list);
  };

  // Tasks 조회
  const getTasks = async (clusterId: string) => {
    const list = cloneDeep(todoList);
    const cluster = list.find((item: Cluster) => item.clusterId === clusterId);
    return cluster ? cluster.tasks : [];
  };

  // Task 추가
  const addTask = async (clusterId: string, input: string) => {
    try {
      trackAddTask();
      const list = cloneDeep(todoList);
      const cluster = list.find(
        (item: Cluster) => item.clusterId === clusterId
      );
      if (!cluster) return;
      cluster.tasks = cluster.tasks.concat({
        clusterId: clusterId,
        taskId: createUid(),
        content: input,
        completed: false,
        createdAt: getCurrentTime(),
      });
      await setClusters(list);
      openToast({
        status: ToastStatus.Success,
        message: Message.TaskAdded,
      });
    } catch (err) {
      console.log(err);
      router.push("/");
      openToast({
        status: ToastStatus.Error,
        message: Message.InvalidRequest,
      });
    }
  };

  // Task 수정
  const editTask = async (
    clusterId: string,
    taskId: string,
    content: string
  ) => {
    trackEditTask();
    const list = cloneDeep(todoList);
    const cluster = list.find((item: Cluster) => item.clusterId === clusterId);
    if (!cluster) return;
    const task = cluster.tasks.find((item: Task) => item.taskId === taskId);
    if (!task || task.content === content) return;
    task.content = content;
    await setClusters(list);
  };

  // Task 삭제
  const removeTask = async (clusterId: string, taskId: string) => {
    trackRemoveTask();
    const list = cloneDeep(todoList);
    const cluster = list.find((item: Cluster) => item.clusterId === clusterId);
    if (!cluster) return;
    cluster.tasks = cluster.tasks.filter(
      (item: Task) => item.taskId !== taskId
    );
    await setClusters(list);
  };

  // Task 상태 변경
  const changeTaskStatus = async (clusterId: string, taskId: string) => {
    const list = cloneDeep(todoList);
    const cluster = list.find((item: Cluster) => item.clusterId === clusterId);
    if (!cluster) return;
    const task = cluster.tasks.find((item: Task) => item.taskId === taskId);
    if (!task) return;
    task.completed = !task.completed;
    await setClusters(list);
  };

  return {
    updatedAt,
    todoList,
    isLoadingTodoList,
    setTodoList,
    setIsLoadingTodoList,

    resetData,
    getClusters,
    addCluster,
    editCluster,
    removeCluster,
    getTasks,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
  };
};

export default useTodo;
