export interface Cluster {
  clusterId: string;
  title: string;
  color: string;
  pinned: boolean;
  createdAt: string;
  tasks: Array<Task>;
}
export interface Task {
  clusterId: string;
  taskId: string;
  content: string;
  completed: boolean;
  createdAt: string;
}
export interface User {
  userKey?: string;
  email?: string | null;
  image?: string | null;
  name?: string | null;
  expires?: string;
  provider?: string;
  createdAt?: string;
}
export enum LoginType {
  Google = "google",
  Github = "github",
}
