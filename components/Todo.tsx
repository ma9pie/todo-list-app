import styled from "@emotion/styled";
import React from "react";

import Dot from "@/components/Dot";

type Props = {
  clusterId: string;
  title: string;
  color: string;
  pinned: boolean;
  created: string;
  tasks: Array<Tasks>;
};

type Tasks = {
  taskId: string;
  clusterId: string;
  content: string;
  done: boolean;
  created: "";
};

const Todo = (props: Props) => {
  return (
    <Wrapper>
      <List>
        <Dot color={props.color}></Dot>
        <Title>{props.title}</Title>
      </List>
      {props.tasks.map((item) => (
        <List key={item.taskId}>
          <Dot color="var(--box)"></Dot>
          <SubText>{item.content}</SubText>
        </List>
      ))}
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100vw - 32px);
  min-width: var(--minWidth);
  padding: 16px;
  border-radius: 5px;
  box-shadow: var(--boxShadow);
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
  cursor: pointer;
`;
const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  width: 100%;
  word-wrap: break-word;
`;
const Title = styled.h3`
  font: var(--medium14);
  width: calc(100% - 24px);
  flex: 1;
`;
const SubText = styled.p`
  font: var(--normal14);
  color: var(--sub);
`;
