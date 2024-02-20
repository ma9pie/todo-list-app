import styled from "@emotion/styled";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import DoneButton from "@/components/common/buttons/DoneButton";
import ColorSet from "@/components/common/ColorSet";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import { EditListModalProps, Message, ToastStatus } from "@/types";
import { isMobileDevice } from "@/utils";

const EditListModal = ({
  clusterId,
  prevTitle,
  prevColor,
}: EditListModalProps) => {
  const { editCluster } = useTodo();
  const { openToast, closeModal } = useModal();
  const { trackViewModal } = useTrackEvent();

  const ref = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(prevTitle);
  const [color, setColor] = useState(prevColor);

  useEffect(() => {
    trackViewModal("EditList");
    if (!ref.current || isMobileDevice()) return;
    ref.current.focus();
  }, []);

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEditList = () => {
    if (title === "") {
      openToast({
        status: ToastStatus.Warn,
        message: Message.PleaseInputListName,
      });
    } else {
      editCluster(clusterId, title, color);
      closeModal();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    handleEditList();
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
          onKeyDown={handleKeyDown}
        ></Input>
      </Content>

      <Content>
        <ColorSet color={color} setColor={setColor}></ColorSet>
      </Content>

      <DoneWrapper>
        <DoneButton onClick={handleEditList}></DoneButton>
      </DoneWrapper>
    </Wrapper>
  );
};

export default EditListModal;

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
