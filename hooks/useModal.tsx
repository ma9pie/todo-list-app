import { useCallback, useContext } from "react";

import AddListModal from "@/components/modals/contents/AddListModal";
import EditListModal from "@/components/modals/contents/EditListModal";
import LoginModal from "@/components/modals/contents/LoginModal";
import SettingsModal from "@/components/modals/contents/SettingsModal";
import TOSModal from "@/components/modals/contents/TOSModal";
import UserInfoModal from "@/components/modals/contents/UserInfoModal";
import { ModalContext } from "@/components/modals/ModalProvider";
import { EditListModalProps, ModalProps, Modals, ModalType } from "@/types";
import { createUid, delay } from "@/utils";

let _modals: Modals;
const DELAY = 200; // modal unmount delay

export default function useModal() {
  const { modals, setModals } = useContext(ModalContext);
  _modals = new Map(modals);

  // 가장 최근의 modal id 조회
  const getRecentModalId = useCallback(() => {
    const arr = Array.from(modals.values()).sort(
      (a: ModalProps, b: ModalProps) => {
        const createdAtA = a.createdAt || 0;
        const createdAtB = b.createdAt || 0;
        return createdAtB - createdAtA;
      }
    );
    if (arr.length === 0) return null;
    return arr[0].id;
  }, [modals]);

  // 모달 open
  const openModal = useCallback(
    (props: ModalProps) => {
      const newMap = new Map(_modals);
      if (props.id && newMap.has(props.id)) return;
      newMap.forEach((value, key) => {
        if (value.type === ModalType.Toast) {
          newMap.delete(key);
        }
      });
      const id = props.id || createUid();
      props.id = id;
      props.isOpen = true;
      props.createdAt = new Date().getTime();
      newMap.set(id, props);
      setModals(newMap);
    },
    [setModals]
  );

  // 모달 close
  const closeModal = useCallback(
    async (id?: string) => {
      const _id = id || getRecentModalId();
      if (!_id) return;
      const newMap = new Map(_modals);
      const props = newMap.get(_id);
      if (!props) return;
      props.isOpen = false;
      newMap.set(_id, props);
      setModals(newMap);
      await delay(DELAY);
      newMap.delete(_id);
      return setModals(new Map(newMap));
    },
    [setModals, getRecentModalId]
  );

  // 모달 change
  const changeModal = useCallback(
    async (props: ModalProps) => {
      await closeModal();
      await delay(20);
      openModal(props);
    },
    [openModal, closeModal]
  );

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
