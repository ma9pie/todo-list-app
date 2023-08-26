import styled from "@emotion/styled";
import moment from "moment";
import React, { useState } from "react";

import DoneButton from "@/components/shared/buttons/DoneButton";
import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import ColorSet from "@/shared/ColorSet";
import { ToastStatus } from "@/types";
import { createUid } from "@/utils";

const colorList = [
  "#64a8ff",
  "#fb8890",
  "#ffbd51",
  "#ffdd78",
  "#c770e4",
  "#58c7c7",
  "#3fd599",
  "#d1d6db",
  "#4d4d59",
];

const AddListModal = () => {
  const { clusters, setClusters } = useTodo();
  const { openToast, closeModal } = useModal();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState(colorList[0]);

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
      addCluster();
      closeModal("addList");
      setTimeout(() => {
        openToast({
          status: ToastStatus.Success,
          message: "List added",
        });
      }, 200);
    }
  };

  const addCluster = () => {
    const result = clusters.concat({
      clusterId: createUid(),
      title: title,
      color: color,
      pinned: false,
      created: moment().format("YYYY-MM-DD HH:mm:ss"),
      tasks: [],
    });
    setClusters(result);
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
          type="text"
          value={title}
          placeholder="List name"
          onChange={onChange}
          onKeyUp={handleOnKeyUp}
        ></Input>
      </Content>

      <Content>
        <ColorSet
          color={color}
          colorList={colorList}
          setColor={setColor}
        ></ColorSet>
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
  font: var(--normal16);
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
