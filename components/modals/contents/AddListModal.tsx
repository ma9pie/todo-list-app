import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import DoneButton from "@/components/common/buttons/DoneButton";
import ColorSet from "@/components/common/ColorSet";
import { COLOR_LIST } from "@/constants";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import { Message, ModalType, ToastStatus } from "@/types";
import { isMobileDevice } from "@/utils";

const AddListModal = () => {
  const router = useRouter();
  const { addCluster } = useTodo();
  const { openToast, changeModal, closeModal, openModal } = useModal();
  const { trackViewModal } = useTrackEvent();

  const ref = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLOR_LIST[0]);

  useEffect(() => {
    trackViewModal("AddList");
    if (!ref.current || isMobileDevice()) return;
    ref.current.focus();
  }, []);

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleAddList = async () => {
    if (title === "") {
      return openToast({
        status: ToastStatus.Warn,
        message: Message.PleaseInputListName,
      });
    }

    try {
      await addCluster(title, color);
      changeModal({
        type: ModalType.Toast,
        status: ToastStatus.Success,
        message: Message.ListAdded,
      });
    } catch (err) {
      console.log(err);
      changeModal({
        type: ModalType.Toast,
        status: ToastStatus.Error,
        message: Message.InvalidRequest,
      });
      setTimeout(() => {
        router.push("/");
      }, 200);
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    handleAddList();
  };

  return (
    <Wrapper>
      <Content>
        <Input
          ref={ref}
          type="text"
          value={title}
          placeholder="List name"
          onChange={handleChange}
          onKeyUp={handleOnKeyUp}
        ></Input>
      </Content>

      <Content>
        <ColorSet color={color} setColor={setColor}></ColorSet>
      </Content>

      <DoneWrapper>
        <DoneButton onClick={handleAddList}></DoneButton>
      </DoneWrapper>
    </Wrapper>
  );
};

export default AddListModal;

const Wrapper = styled.div`
  position: relative;
  height: 300px;
`;
const Content = styled.div`
  padding: 8px 0px;
  border-bottom: 1px solid var(--sectionLine);
`;
const Input = styled.input`
  font-size: 16px;
  width: 100%;
  height: 30px;
  border: 0px;
`;
const DoneWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
`;
