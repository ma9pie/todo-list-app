import { atom } from "recoil";

export type Modal = {
  isOpen?: boolean;
  component?: () => JSX.Element;
  onRequestClose?: () => void;
};

export const modalState = atom<Modal[]>({
  key: "modalState",
  default: [],
});
