import styled from "@emotion/styled";
import React, { createContext, ReactNode, useState } from "react";

import AlertModal from "@/modals/AlertModal";
import BottomSheet from "@/modals/BottomSheet";
import ConfirmModal from "@/modals/ConfirmModal";
import Modal from "@/modals/index";
import Toast from "@/modals/Toast";
import { ModalProps, ModalType } from "@/types";

type Props = {
  children: ReactNode;
};

type Modals = Map<string, ModalProps>;

export const ModalContext = createContext({
  modals: new Map(),
  setModals: (state: Modals) => {},
});

const ModalProvider = ({ children }: Props) => {
  const [modals, setModals] = useState<Modals>(new Map());

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
    <ModalContext.Provider value={{ modals, setModals }}>
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
            <AlertModal key={props.key} {...props}></AlertModal>
          ))}
        </Container>
        <Container id="confirm-modal">
          {confirmList.map((props) => (
            <ConfirmModal key={props.key} {...props}></ConfirmModal>
          ))}
        </Container>
        <Container id="toast">
          {toastList.map((props) => (
            <Toast key={props.key} {...props}></Toast>
          ))}
        </Container>
      </Wrapper>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

const Wrapper = styled.div``;
const Container = styled.div``;
