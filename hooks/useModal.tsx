import { useCallback, useContext } from "react";

import AddListModal from "@/components/modals/contents/AddListModal";
import EditListModal from "@/components/modals/contents/EditListModal";
import LoginModal from "@/components/modals/contents/LoginModal";
import SettingsModal from "@/components/modals/contents/SettingsModal";
import TOSModal from "@/components/modals/contents/TOSModal";
import UserInfoModal from "@/components/modals/contents/UserInfoModal";
import { ModalContext } from "@/components/modals/ModalProvider";
import { EditListModalProps, ModalProps, Modals, ModalType } from "@/types";

let tmpModals: Modals;
const DELAY = 200; // modal unmount delay

export default function useModal() {
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
    props.id = props.id || createUid();
    props.isOpen = true;
    props.createdAt = new Date().getTime();
    props.onRequestClose = async () => {
      const hashMapB = new Map(hashMapA);
      props.isOpen = false;
      if (props.id) {
        hashMapB.set(props.id, props);
        setModals(hashMapB);
        setTimeout(() => {
          hashMapB.delete(props.id!);
          setModals(new Map(hashMapB));
        }, DELAY);
      }
    };
    hashMapA.set(props.id, props);
    setModals(hashMapA);
  };

  const closeModal = (id?: string) => {
    const hashMap: Map<string, ModalProps> = new Map(tmpModals);
    if (id) {
      const props = hashMap.get(id);
      if (props) {
        props.isOpen = false;
        hashMap.set(id, props);
        setModals(hashMap);
        setTimeout(() => {
          hashMap.delete(id);
          setModals(new Map(hashMap));
        }, DELAY);
      }
    }
    // id가 없을 경우 가장 최근에 띄워진 모달의 id로 closeModal 실행
    else {
      const _id = getRecentModalId();
      if (_id) closeModal(_id);
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
    return arr[0].id;
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

  const openUserInfoModal = () => {
    openModal({
      component: () => <UserInfoModal></UserInfoModal>,
    });
  };

  const openSettingsModal = () => {
    openBottomSheet({
      title: "Settings",
      component: () => <SettingsModal></SettingsModal>,
    });
  };

  const openAddListModal = () => {
    openBottomSheet({
      title: "Add List",
      component: () => <AddListModal></AddListModal>,
    });
  };

  const openEditListModal = (props: EditListModalProps) => {
    openBottomSheet({
      title: "Edit List",
      component: () => <EditListModal {...props}></EditListModal>,
    });
  };

  const openRemoveClusterModal = (callback: () => void) => {
    openConfirm({
      title: "Delete list",
      message: `Would you like to delete\n this list?`,
      onRequestConfirm: callback,
    });
  };

  // 이용약관
  const openTOSModal = () => {
    openBottomSheet({
      title: "Terms of service",
      component: () => <TOSModal></TOSModal>,
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
    openUserInfoModal,
    openSettingsModal,
    openAddListModal,
    openEditListModal,
    openRemoveClusterModal,
    openTOSModal,
  };
}
