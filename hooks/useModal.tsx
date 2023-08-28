import { useCallback, useContext } from "react";

import LoginModal from "@/components/modals/contents/LoginModal";
import SettingsModal from "@/components/modals/contents/SettingsModal";
import useTodo from "@/hooks/useTodo";
import { ModalContext } from "@/modals/ModalProvider";
import { ModalProps, Modals, ModalType } from "@/types";

let tmpModals: Modals;
const DELAY = 200; // modal unmount delay

export default function useModal() {
  const { modals, setModals } = useContext(ModalContext);
  tmpModals = modals;

  const { clusters, setClusters } = useTodo();

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
    props.createdAt = new Date().getTime();
    props.onRequestClose = async () => {
      const hashMapB = new Map(hashMapA);
      props.isOpen = false;
      if (props.key) {
        hashMapB.set(props.key, props);
        setModals(hashMapB);
        setTimeout(() => {
          hashMapB.delete(props.key!);
          setModals(new Map(hashMapB));
        }, DELAY);
      }
    };
    hashMapA.set(props.key, props);
    setModals(hashMapA);
  };

  const closeModal = (key?: string) => {
    const hashMap: Map<string, ModalProps> = new Map(tmpModals);
    if (key) {
      const props = hashMap.get(key);
      if (props) {
        props.isOpen = false;
        hashMap.set(key, props);
        setModals(hashMap);
        setTimeout(() => {
          hashMap.delete(key);
          setModals(new Map(hashMap));
        }, DELAY);
      }
    }
    // id가 없을 경우 가장 최근에 띄워진 모달의 id로 closeModal 실행
    else {
      const id = getRecentModalId();
      if (id) closeModal(id);
    }
  };

  // 모달 변경
  const changeModal = (props: ModalProps) => {
    closeModal();
    setTimeout(() => {
      openModal(props);
    }, DELAY);
  };

  // 가장 최근의 modal id 조회
  const getRecentModalId = useCallback(() => {
    const hashMap: Map<string, ModalProps> = new Map(tmpModals);
    const arr = Array.from(hashMap.values()).sort(
      (a: ModalProps, b: ModalProps) => {
        const createdAtA = a.createdAt || 0;
        const createdAtB = b.createdAt || 0;
        return createdAtB - createdAtA;
      }
    );
    if (arr.length === 0) return null;
    return arr[0].key;
  }, []);

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

  const openLoginModal = () => {
    openModal({
      component: () => <LoginModal></LoginModal>,
    });
  };

  const openSettingsModal = () => {
    openBottomSheet({
      key: "settings",
      title: "SettingsModal",
      component: () => <SettingsModal></SettingsModal>,
    });
  };

  const openDeleteClusterModal = (clusterId: string) => {
    openConfirm({
      title: "항목 삭제",
      message: "해당 항목을 삭제하시겠습니까?",
      onRequestConfirm: () => {
        const _clusters = clusters.filter(
          (item) => item.clusterId !== clusterId
        );
        setClusters(_clusters);
      },
    });
  };

  return {
    openModal,
    closeModal,
    changeModal,
    openAlert,
    openConfirm,
    openBottomSheet,
    openToast,

    openLoginModal,
    openSettingsModal,
    openDeleteClusterModal,
  };
}
