import { useRecoilState } from "recoil";

import { Modal, modalState, ModalType } from "@/recoil/states/modal";

interface UseModal {
  openModal: (props: Modal) => void;
  openAlert: (props: Modal) => void;
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

  const openAlert = (props: Modal) => {
    props.type = ModalType.Alert;
    openModal(props);
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
    openAlert,
    closeModal,
  };
}
