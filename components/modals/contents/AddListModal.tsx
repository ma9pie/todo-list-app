import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

import DoneButton from "@/components/shared/buttons/DoneButton";
import { COLOR_LIST } from "@/constants";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import ColorSet from "@/shared/ColorSet";
import { ToastStatus } from "@/types";
import { isMobileDevice } from "@/utils";

const AddListModal = () => {
  const { addCluster } = useTodo();
  const { openToast, closeModal } = useModal();
  const { trackViewModal, trackAddList } = useTrackEvent();

  const ref = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLOR_LIST[0]);

  useEffect(() => {
    trackViewModal("AddList");
    if (!ref.current || isMobileDevice()) return;
    ref.current.focus();
  }, []);

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };

  const addList = () => {
    if (title === "") {
      openToast({
        status: ToastStatus.Warn,
        message: "Please input list name",
      });
    } else {
      trackAddList();
      addCluster(title, color);
      closeModal();
      setTimeout(() => {
        openToast({
          status: ToastStatus.Success,
          message: "List added",
        });
      }, 200);
    }
  };

  const handleOnKeyUp = (e: any) => {
    if (e.key === "Enter") {
      addList();
    }
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
        <DoneButton onClick={addList}></DoneButton>
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
