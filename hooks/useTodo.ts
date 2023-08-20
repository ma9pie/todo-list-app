import { useRecoilState } from "recoil";

import { clusterState, taskState } from "@/recoil/atoms";

const useTodo = () => {
  const [clusters, setClusters] = useRecoilState(clusterState);
  const [tasks, setTasks] = useRecoilState(taskState);

  const getCluster = (id: string) => {
    return clusters.find((item) => item.clusterId === id);
  };

  return {
    clusters,
    tasks,
    setClusters,
    setTasks,
    getCluster,
  };
};

export default useTodo;
