import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

import { modalState, ModalType } from "@/recoil/states/modal";
import Modal from "@/shared/modals";
import Alert from "@/shared/modals/Alert";
import BottomSheet from "@/shared/modals/BottomSheet";
import Confirm from "@/shared/modals/Confirm";
import Toast from "@/shared/modals/Toast";

const ModalRoot = () => {
  const modals = useRecoilValue(modalState);

  const modalList = modals.filter((item) => item.type === undefined);
  const alertList = modals.filter((item) => item.type === ModalType.Alert);
  const confirmList = modals.filter((item) => item.type === ModalType.Confirm);
  const bottomSheetList = modals.filter(
    (item) => item.type === ModalType.BottomSheet
  );
  const toastList = modals.filter((item) => item.type === ModalType.Toast);

  return (
    <Wrapper id="modal-manager">
      <Container id="modal">
        {modalList.map((props: any, idx) => (
          <Modal key={idx} {...props}></Modal>
        ))}
      </Container>
      <Container id="alert-modal">
        {alertList.map((props: any, idx) => (
          <Alert key={idx} {...props}></Alert>
        ))}
      </Container>
      <Container id="confirm-modal">
        {confirmList.map((props: any, idx) => (
          <Confirm key={idx} {...props}></Confirm>
        ))}
      </Container>
      <Container id="bottom-sheet">
        {bottomSheetList.map((props: any, idx) => (
          <BottomSheet key={idx} {...props}></BottomSheet>
        ))}
      </Container>
      <Container id="toast">
        {toastList.map((props: any, idx) => (
          <Toast key={idx} {...props}></Toast>
        ))}
      </Container>
    </Wrapper>
  );
};

export default ModalRoot;

const Wrapper = styled.div``;
const Container = styled.div``;
