import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

import { modalState, ModalType } from "@/recoil/states/modal";
import Modal from "@/shared/modals";
import Alert from "@/shared/modals/Alert";
import BottomSheet from "@/shared/modals/BottomSheet";
import Confirm from "@/shared/modals/Confirm";
import ToastPopup from "@/shared/modals/Toast";

const ModalRoot = () => {
  const modals = useRecoilValue(modalState);

  const modalList = modals.filter((item) => item.type === undefined);
  const alertList = modals.filter((item) => item.type === ModalType.Alert);

  return (
    <div id="modal-manager">
      <div id="modal">
        {modalList.map((props: any, idx) => (
          <Modal key={idx} {...props}></Modal>
        ))}
      </div>
      <div id="alert-modal">
        {alertList.map((props: any, idx) => (
          <Alert key={idx} {...props}></Alert>
        ))}
      </div>
      <div id="confirm-modal"></div>
      <div id="bottom-sheet"></div>
      <div id="toast"></div>
    </div>
  );
};

export default ModalRoot;
