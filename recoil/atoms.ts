import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Cluster, Task } from "@/types";

const { persistAtom } = recoilPersist();

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
export const testState = atom({
  key: "testState",
  default: 0,
});
