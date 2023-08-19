import { useCallback, useContext } from "react";
import ReactDOM from "react-dom/client";

import Alert from "@/modals/Alert";
import BottomSheet from "@/modals/BottomSheet";
import Confirm from "@/modals/Confirm";
import Modal from "@/modals/index";
import { ModalContext } from "@/modals/ModalProvider";
import Toast from "@/modals/Toast";
import { ModalProps, Modals, ModalType } from "@/types";

interface UseModal {
  openModal: (props: ModalProps) => void;
  openAlert: (props: ModalProps) => void;
  openConfirm: (props: ModalProps) => void;
  openBottomSheet: (props: ModalProps) => void;
  openToast: (props: ModalProps) => void;
  closeModal: (key?: string) => void;
}

let tmpModals: Modals;

export default function useModal(): UseModal {
  const { modals, setModals } = useContext(ModalContext);
  tmpModals = modals;

  const createUid = useCallback(() => {
    if (typeof window !== undefined && window.crypto) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0].toString(36);
    } else {
      return Math.random().toString(36).substring(2, 9);
    }
  }, []);

  const openModal = (props: ModalProps) => {
    const hashMapA: Map<string, ModalProps> = new Map(tmpModals);
    hashMapA.forEach((value, key) => {
      if (value.type === ModalType.Toast) {
        hashMapA.delete(key);
      }
    });
    props.key = props.key || createUid();
    props.isOpen = true;
    props.onRequestClose = async () => {
      const hashMapB = new Map(hashMapA);
      props.isOpen = false;
      if (props.key) {
        hashMapB.set(props.key, props);
        setModals(hashMapB);
        setTimeout(() => {
          hashMapB.delete(props.key!);
          setModals(new Map(hashMapB));
        }, 200);
      }
    };
    hashMapA.set(props.key, props);
    setModals(hashMapA);
  };

  const closeModal = (key?: string) => {
    const hashMap: Map<string, ModalProps> = new Map(modals);
    if (key) {
      const props = hashMap.get(key);
      if (props) {
        props.isOpen = false;
        hashMap.set(key, props);
        setModals(hashMap);
        setTimeout(() => {
          hashMap.delete(key);
          setModals(new Map(hashMap));
        }, 200);
      }
      return;
    }
  };

  const openAlert = (props: ModalProps) => {
    openModal({ ...props, type: ModalType.Alert });
  };

  const openConfirm = (props: ModalProps) => {
    openModal({ ...props, type: ModalType.Confirm });
  };

  const openBottomSheet = (props: ModalProps) => {
    openModal({ ...props, type: ModalType.BottomSheet });
  };

  const openToast = (props: ModalProps) => {
    openModal({ ...props, type: ModalType.Toast });
  };

  return {
    openModal,
    closeModal,
    openAlert,
    openConfirm,
    openBottomSheet,
    openToast,
  };
}

/**
 * React component가 아닌
 * 일반 자바스크립트 파일에서 tmpModals사용 가능한 Modal Utils
 * 컴포넌트 내에서 recoilStatetmpModals사용불가
 * (useModal 개발 이전에 사용하던 방식)
 */
export const modalUtils = {
  propsMap: new Map(),

  // node 추가
  appendNode: (
    Component: (props: ModalProps) => JSX.Element,
    props: ModalProps,
    id: string
  ) => {
    const { key } = props;
    const defaultProps = {
      isOpen: true,
      unmount: () => {},
      onRequestClose: () => {},
    };
    const container = document.getElementById(id);
    if (!container) return;
    const node = document.createElement("div");
    const root = ReactDOM.createRoot(node);
    container.append(node);

    defaultProps.unmount = () => {
      root.unmount();
      node.remove();
    };
    defaultProps.onRequestClose = () => {
      defaultProps.isOpen = false;
      root.render(<Component {...defaultProps} {...props}></Component>);

      setTimeout(() => {
        defaultProps.unmount();
        if (key) {
          modalUtils.propsMap.delete(key);
        }
      }, 200);
    };

    defaultProps.isOpen = true;
    root.render(<Component {...defaultProps} {...props}></Component>);

    if (key) {
      node.id = key;
      modalUtils.propsMap.set(key, defaultProps);
    }
  },

  // close
  close: (key: string) => {
    const node = document.getElementById(key);
    if (node) {
      modalUtils.propsMap.get(key).onRequestClose();
    }
  },

  // remove childNode
  removeChildNodes: (key: string) => {
    const node: any = document.getElementById(key);
    if (node) node.innerHTML = "";
  },

  // modal
  openModal: (props: ModalProps) => {
    modalUtils.appendNode(Modal, props, "modal");
  },

  // alert
  openAlert: (props: ModalProps) => {
    modalUtils.appendNode(Alert, props, "alert-modal");
  },

  // confirm
  openConfirm: (props: ModalProps) => {
    modalUtils.appendNode(Confirm, props, "confirm-modal");
  },

  // bottom-sheet
  openBottomSheet: (props: ModalProps) => {
    modalUtils.appendNode(BottomSheet, props, "bottom-sheet");
  },

  // toast
  openToast: (props: ModalProps) => {
    modalUtils.removeChildNodes("toast");
    modalUtils.appendNode(Toast, props, "toast");
  },
};
