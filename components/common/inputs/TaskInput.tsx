import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import AddSvg from "@/images/add.svg";
import { Message, ModalType, ToastStatus } from "@/types";

interface Props {
  clusterId: string;
}

const TaskInput = ({ clusterId }: Props) => {
  const router = useRouter();

  const { addTask } = useTodo();
  const { openToast, changeModal } = useModal();

  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddTask = async () => {
    if (!input) {
      return openToast({
        status: ToastStatus.Warn,
        message: Message.PleaseInputTask,
      });
    }

    try {
      await addTask(clusterId, input);
      setInput("");
      changeModal({
        type: ModalType.Toast,
        status: ToastStatus.Success,
        message: Message.TaskAdded,
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    handleAddTask();
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="new task"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
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
  font-size: 18px;
  height: 30px;
  width: 100%;
  border: 0px;
`;
