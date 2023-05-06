import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { Fragment } from "react";
import { useRecoilState } from "recoil";

import ToastPopup from "@/components/shared/modals/Toast";
import RecoilComponent from "@/components/test/RecoilComponent";
import useModal from "@/hooks/useModal";
import { modalState } from "@/recoil/states/modal";
import Modal from "@/shared/modals";
import Alert from "@/shared/modals/Alert";
import BottomSheet from "@/shared/modals/BottomSheet";
import Confirm from "@/shared/modals/Confirm";

const ModalRoot = () => {
  const modal = useModal();
  const [modalList, setModalList] = useRecoilState(modalState);

  return (
    <div id="modal-manager">
      <div id="modal"></div>
      <div id="confirm-modal"></div>
      <div id="alert-modal"></div>
      <div id="bottom-sheet"></div>
      <div id="toast"></div>
      {modalList.map((props: any, idx) => (
        <Modal key={idx} {...props}></Modal>
      ))}
    </div>
  );
};

export default ModalRoot;
