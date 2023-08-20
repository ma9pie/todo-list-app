import styled from "@emotion/styled";
import moment from "moment";
import React, { useState } from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import AddSvg from "@/images/add.svg";
import { ToastStatus } from "@/types";
import { createUid } from "@/utils";

interface Props {
  clusterId: string;
}

const TaskInput = ({ clusterId }: Props) => {
  const { clusters, setClusters } = useTodo();
  const { openToast } = useModal();

  const [input, setInput] = useState("");

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const addTask = () => {
    if (!input) {
      return openToast({
        status: ToastStatus.Warn,
        message: "Please input task",
      });
    }
    const _clusters = clusters.map((item) => {
      return { ...item };
    });
    const cluster = _clusters.find((item) => item.clusterId === clusterId);
    if (cluster) {
      cluster.tasks = cluster.tasks.concat({
        clusterId: clusterId,
        taskId: createUid(),
        content: input,
        completed: false,
        created: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      setClusters(_clusters);
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

  const handleOnKeyUp = (e: any) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="new task"
        value={input}
        onChange={handleInput}
        onKeyUp={handleOnKeyUp}
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
