import { selector } from "recoil";

import { clusterState, taskState } from "@/recoil/atoms";
import { Cluster, Task } from "@/types";

export const todoState = selector({
  key: "todoState",
  get: ({ get }) => {
    const tmpClusters = get(clusterState);
    const tmpTasks = get(taskState);
    const tasksMap = new Map();

    tmpTasks.map((task: Task) => {
      const cluster = tasksMap.get(task.clusterId);
      if (cluster) {
        tasksMap.set(task.clusterId, cluster.concat(task));
      } else {
        tasksMap.set(task.clusterId, [task]);
      }
    });
    return tmpClusters.map((cluster: Cluster) => {
      const tmp = { ...cluster };
      tmp.tasks = tasksMap.get(tmp.clusterId) || [];
      return tmp;
    });
  },
});
