export interface Cluster {
  clusterId: string;
  title: string;
  color: string;
  pinned: boolean;
  created: string;
  tasks: Array<Task>;
}

export interface Task {
  taskId: string;
  clusterId: string;
  content: string;
  done: boolean;
  created: "";
}
