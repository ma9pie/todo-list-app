import { useRecoilState } from "recoil";

import { clusterState, taskState } from "@/recoil/atoms";

const useLocalStorage = () => {
  const [clusters, setClusters] = useRecoilState(clusterState);
  const [tasks, setTasks] = useRecoilState(taskState);

  return {
    clusters,
    tasks,
    setClusters,
    setTasks,
  };
};

export default useLocalStorage;
