import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

import DoneButton from "@/components/shared/buttons/DoneButton";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import ColorSet from "@/shared/ColorSet";
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

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };

  const editList = () => {
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

  const handleOnKeyUp = (e: any) => {
    if (e.key !== "Enter") return;
    editList();
  };

  return (
    <Wrapper>
      <Content>
        <Input
          ref={ref}
          type="text"
          value={title}
          placeholder="List name"
          onChange={onChange}
          onKeyUp={handleOnKeyUp}
        ></Input>
      </Content>

      <Content>
        <ColorSet color={color} setColor={setColor}></ColorSet>
      </Content>

      <DoneWrapper>
        <DoneButton onClick={editList}></DoneButton>
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
