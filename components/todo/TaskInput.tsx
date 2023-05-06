import styled from "@emotion/styled";
import React, { useState } from "react";

import AddSvg from "@/images/add.svg";
import modalUtils from "@/utils/modalUtils";

const TaskInput = () => {
  const [task, setTask] = useState("");

  const handleInput = (e: any) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task) {
      modalUtils.openToast({
        type: "success",
        message: "Task added",
      });
      setTask("");
    } else {
      modalUtils.openToast({
        type: "warn",
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
