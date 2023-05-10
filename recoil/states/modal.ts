import { atom } from "recoil";

export enum ModalType {
  Alert,
  Confirm,
  BottomSheet,
  Toast,
}
export enum ToastStatus {
  Success,
  Error,
  Warn,
  None,
}

export type ModalProps = {
  key?: string;
  type?: ModalType;
  status?: ToastStatus;
  isOpen?: boolean;
  title?: string;
  message?: string;
  height?: string;
  cancleBtnText?: string;
  confirmBtnText?: string;
  component?: () => JSX.Element;
  onRequestClose?: () => void;
  onRequestConfirm?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
};

export const modalState = atom<Map<string, ModalProps>>({
  key: "modalState",
  default: new Map(),
});
