import { useRecoilState } from "recoil";

import { Modal, modalState, ModalType } from "@/recoil/states/modal";

interface UseModal {
  openModal: (props: Modal) => void;
  openAlert: (props: Modal) => void;
  openConfirm: (props: Modal) => void;
  openBottomSheet: (props: Modal) => void;
  openToast: (props: Modal) => void;
  closeModal: () => void;
}

export default function useModal(): UseModal {
  const [modals, setModals] = useRecoilState(modalState);

  const openModal = (props: Modal) => {
    const list: Modal[] = [...modals];
    props.isOpen = true;
    props.onRequestClose = () => {
      const list: Modal[] = [...modals];
      list.push({ ...props, isOpen: false });
      setModals(list);
      setTimeout(() => {
        setModals(list.slice(0, -1));
      }, 200);
    };
    list.push(props);
    setModals(list);
  };

  const closeModal = () => {
    if (modals.length === 0) return;
    const list: Modal[] = [...modals];
    const props = list.pop();
    list.push({ ...props, isOpen: false });
    setModals(list);
    setTimeout(() => {
      setModals(list.slice(0, -1));
    }, 200);
  };

  return {
    openModal,
    openAlert: (props) => openModal({ ...props, type: ModalType.Alert }),
    openConfirm: (props) => openModal({ ...props, type: ModalType.Confirm }),
    openBottomSheet: (props) =>
      openModal({ ...props, type: ModalType.BottomSheet }),
    openToast: (props) => openModal({ ...props, type: ModalType.Toast }),
    closeModal,
  };
}
