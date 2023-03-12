import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const clusters = atom({
  key: "clusters",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const tasks = atom({
  key: "tasks",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
