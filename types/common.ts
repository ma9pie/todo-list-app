export interface Cluster {
  clusterId: string;
  title: string;
  color: string;
  pinned: boolean;
  created: string;
  tasks: Array<Task>;
}

export interface Task {
  clusterId: string;
  taskId: string;
  content: string;
  completed: boolean;
  created: string;
}
