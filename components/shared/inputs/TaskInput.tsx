import styled from "@emotion/styled";
import moment from "moment";
import React, { useState } from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import AddSvg from "@/images/add.svg";
import { ToastStatus } from "@/types";

interface Props {
  clusterId: string;
}

const TaskInput = ({ clusterId }: Props) => {
  const { addTask } = useTodo();
  const { openToast } = useModal();

  const [input, setInput] = useState("");

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleAddTask = async () => {
    if (!input) {
      return openToast({
        status: ToastStatus.Warn,
        message: "Please input task",
      });
    }
    if (await addTask(clusterId, input)) {
      setInput("");
      openToast({
        status: ToastStatus.Success,
        message: "Task added",
      });
    } else {
      openToast({
        status: ToastStatus.Error,
        message: "Invalid clusterId",
      });
    }
  };

  const enter = (e: any) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
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
      <AddSvg width={40} height={40} onClick={handleAddTask}></AddSvg>
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
  height: 30px;
  width: 100%;
  border: 0px;
`;
