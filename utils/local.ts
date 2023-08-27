import moment from "moment";

import { createUid } from "@/utils";

export const local = {
  init: () => {
    local.setList("clusters", [
      {
        clusterId: "1",
        title: "오늘 해야할 일",
        color: "#64a8ff",
        pinned: false,
        createdAt: "",
        tasks: [],
      },
      {
        clusterId: "2",
        title: "내일 해야할 일",
        color: "#fb8890",
        pinned: false,
        createdAt: "",
        tasks: [],
      },
    ]);
    local.setList("tasks", [
      {
        taskId: "1001",
        clusterId: "1",
        content: "react 공부",
        completed: false,
        createdAt: "",
      },
      {
        taskId: "1002",
        clusterId: "1",
        content: "typescript 공부",
        completed: false,
        createdAt: "",
      },
      {
        taskId: "1003",
        clusterId: "2",
        content: "redux 공부",
        completed: false,
        createdAt: "",
      },
    ]);
  },
  getList: (key: string) => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  },
  setList: (key: string, value: Array<object>) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getTodos: () => {
    const clusters = local.getList("clusters");
    const tasks = local.getList("tasks");
    const tasksMap = new Map();

    tasks.map((task: any) => {
      const cluster = tasksMap.get(task.clusterId);
      if (cluster) {
        tasksMap.set(task.clusterId, cluster.concat(task));
      } else {
        tasksMap.set(task.clusterId, [task]);
      }
    });
    return clusters.map((cluster: any) => {
      cluster.tasks = tasksMap.get(cluster.clusterId) || [];
      return cluster;
    });
  },
  addCluster: (title: string, color: string) => {
    const clusters = local.getList("clusters").concat({
      clusterId: createUid(),
      title: title,
      color: color,
      pinned: false,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: [],
    });
    console.log(clusters);
    local.setList("clusters", clusters);
  },
};
