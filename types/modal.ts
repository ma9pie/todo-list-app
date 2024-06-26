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

export interface ModalProps {
  id?: string;
  createdAt?: number;
  type?: ModalType;
  status?: ToastStatus;
  isOpen?: boolean;
  title?: string;
  message?: string;
  top?: string;
  left?: string;
  padding?: string;
  height?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  component?: () => JSX.Element;
  onRequestConfirm?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
}
export interface EditListModalProps {
  clusterId: string;
  prevTitle: string;
  prevColor: string;
}
