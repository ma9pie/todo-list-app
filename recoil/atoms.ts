import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Cluster, Task, User } from "@/types";

const { persistAtom } = recoilPersist();

export const themeState = atom<"Dark" | "Light">({
  key: "ga/themeState",
  default: "Dark",
  effects_UNSTABLE: [persistAtom],
});
export const isInitializedGAState = atom<boolean>({
  key: "ga/isInitializedGA",
  default: false,
});
export const clusterState = atom<Cluster[]>({
  key: "clusterState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const taskState = atom<Task[]>({
  key: "taskState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
