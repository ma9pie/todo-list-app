import { atom } from "recoil";

export enum ModalType {
  Alert,
}
export type Modal = {
  type?: ModalType;
  isOpen?: boolean;
  title?: string;
  message?: string;
  cancleBtnText?: string;
  confirmBtnText?: string;
  component?: () => JSX.Element;
  onRequestClose?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
};

export const modalState = atom<Modal[]>({
  key: "modalState",
  default: [],
});
