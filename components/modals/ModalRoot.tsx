import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

import Alert from "@/modals/Alert";
import BottomSheet from "@/modals/BottomSheet";
import Confirm from "@/modals/Confirm";
import Modal from "@/modals/index";
import Toast from "@/modals/Toast";
import { ModalProps, modalState, ModalType } from "@/recoil/states/modal";

const ModalRoot = () => {
  const modals = useRecoilValue(modalState);

  const modalList: ModalProps[] = [];
  const alertList: ModalProps[] = [];
  const confirmList: ModalProps[] = [];
  const bottomSheetList: ModalProps[] = [];
  const toastList: ModalProps[] = [];

  modals.forEach((value, key) => {
    switch (value.type) {
      case ModalType.Alert:
        alertList.push(value);
        break;
      case ModalType.Confirm:
        confirmList.push(value);
        break;
      case ModalType.BottomSheet:
        bottomSheetList.push(value);
        break;
      case ModalType.Toast:
        toastList.push(value);
        break;
      default:
        modalList.push(value);
        break;
    }
  });

  return (
    <Wrapper id="modal-manager">
      <Container id="modal">
        {modalList.map((props) => (
          <Modal key={props.key} {...props}></Modal>
        ))}
      </Container>
      <Container id="bottom-sheet">
        {bottomSheetList.map((props) => (
          <BottomSheet key={props.key} {...props}></BottomSheet>
        ))}
      </Container>
      <Container id="alert-modal">
        {alertList.map((props) => (
          <Alert key={props.key} {...props}></Alert>
        ))}
      </Container>
      <Container id="confirm-modal">
        {confirmList.map((props) => (
          <Confirm key={props.key} {...props}></Confirm>
        ))}
      </Container>
      <Container id="toast">
        {toastList.map((props) => (
          <Toast key={props.key} {...props}></Toast>
        ))}
      </Container>
    </Wrapper>
  );
};

export default ModalRoot;

const Wrapper = styled.div``;
const Container = styled.div``;
