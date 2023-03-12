import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const clusterState = atom({
  key: "clusterState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const taskState = atom({
  key: "taskState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
