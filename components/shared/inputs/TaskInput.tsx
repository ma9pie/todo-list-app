import styled from "@emotion/styled";
import React, { useState } from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import AddSvg from "@/images/add.svg";
import { Message, ToastStatus } from "@/types";

interface Props {
  clusterId: string;
}

const TaskInput = ({ clusterId }: Props) => {
  const { addTask } = useTodo();
  const { openToast } = useModal();
  const { trackClickBtn } = useTrackEvent();

  const [input, setInput] = useState("");

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleAddTask = async () => {
    if (!input) {
      return openToast({
        status: ToastStatus.Warn,
        message: Message.PleaseInputTask,
      });
    }
    setInput("");
    addTask(clusterId, input);
  };

  const enter = (e: any) => {
    if (e.key !== "Enter") return;
    handleAddTask();
  };

  const handleClickAddBtn = () => {
    trackClickBtn("AddTask");
    handleAddTask();
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="new task"
        value={input}
        onChange={handleInput}
        onKeyUp={enter}
      ></Input>
      <AddSvg width={40} height={40} onClick={handleClickAddBtn}></AddSvg>
    </Wrapper>
  );
};

export default TaskInput;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 60px;
  padding: 0px 16px;
  border-radius: 10px 10px 0px 0px;
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
`;
const Input = styled.input`
  font-size: 18px;
  height: 30px;
  width: 100%;
  border: 0px;
`;
