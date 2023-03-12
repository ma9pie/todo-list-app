import { selector } from "recoil";

import { clusters } from "@/recoil/atom";

export const tmptState = selector({
  key: "key",
  get: ({ get }) => {
    const tmp = get(clusters);
    return tmp;
  },
});
