import { useRecoilState } from "recoil";

import { Modal, modalState } from "@/recoil/states/modal";

interface UseModal {
  openModal: (props: Modal) => void;
  closeModal: () => void;
}

export default function useModal(): UseModal {
  const [modalList, setModalList] = useRecoilState(modalState);

  const openModal = (props: Modal) => {
    const list: Modal[] = [...modalList];
    props.isOpen = true;
    props.onRequestClose = () => {
      const list: Modal[] = [...modalList];
      list.push({ ...props, isOpen: false });
      setModalList(list);
      setTimeout(() => {
        setModalList(list.slice(0, -1));
      }, 200);
    };
    list.push(props);
    setModalList(list);
  };

  const closeModal = () => {
    if (modalList.length === 0) return;
    const list: Modal[] = [...modalList];
    const props = list.pop();
    list.push({ ...props, isOpen: false });
    setModalList(list);
    setTimeout(() => {
      setModalList(list.slice(0, -1));
    }, 200);
  };

  return {
    openModal,
    closeModal,
  };
}
