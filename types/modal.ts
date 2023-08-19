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
export type Modals = Map<string, ModalProps>;

export type ModalProps = {
  key?: string;
  type?: ModalType;
  status?: ToastStatus;
  isOpen?: boolean;
  title?: string;
  message?: string;
  top?: string;
  left?: string;
  padding?: string;
  height?: string;
  cancleBtnText?: string;
  confirmBtnText?: string;
  component?: () => JSX.Element;
  onRequestClose?: () => void;
  onRequestConfirm?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
};
