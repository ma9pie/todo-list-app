import styled from "@emotion/styled";
import React, { useState } from "react";

import useModal from "@/hooks/useModal";
import AddSvg from "@/images/add.svg";
import { ToastStatus } from "@/recoil/states/modal";

const TaskInput = () => {
  const modal = useModal();

  const [task, setTask] = useState("");

  const handleInput = (e: any) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task) {
      modal.openToast({
        status: ToastStatus.Success,
        message: "Task added",
      });
      setTask("");
    } else {
      modal.openToast({
        status: ToastStatus.Warn,
        message: "Please input task",
      });
    }
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="new task"
        value={task}
        onChange={handleInput}
      ></Input>
      <AddSvg width={40} height={40} onClick={addTask}></AddSvg>
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
