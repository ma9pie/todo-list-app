import moment from "moment";

import commonUtils from "@/utils/commonUtils";

const localUtils = {
  init: () => {
    localUtils.setList("clusters", [
      {
        clusterId: "1",
        title: "오늘 해야할 일",
        color: "#64a8ff",
        pinned: false,
        created: "",
        tasks: [],
      },
      {
        clusterId: "2",
        title: "내일 해야할 일",
        color: "#fb8890",
        pinned: false,
        created: "",
        tasks: [],
      },
    ]);
    localUtils.setList("tasks", [
      {
        taskId: "1001",
        clusterId: "1",
        content: "react 공부",
        done: false,
        created: "",
      },
      {
        taskId: "1002",
        clusterId: "1",
        content: "typescript 공부",
        done: false,
        created: "",
      },
      {
        taskId: "1003",
        clusterId: "2",
        content: "redux 공부",
        done: false,
        created: "",
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
    const clusters = localUtils.getList("clusters");
    const tasks = localUtils.getList("tasks");
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
    const clusters = localUtils.getList("clusters").concat({
      clusterId: commonUtils.uid(),
      title: title,
      color: color,
      pinned: false,
      created: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: [],
    });
    console.log(clusters);
    localUtils.setList("clusters", clusters);
  },
};

export default localUtils;
