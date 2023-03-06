import styled from "@emotion/styled";
import React from "react";

import Dot from "@/components/Dot";

type Props = {
  id: string;
  title: string;
  color: string;
  pinned: boolean;
  created: string;
  tasks: Array<Tasks>;
};

type Tasks = {
  id: string;
  content: string;
  done: boolean;
  note: string;
  subTasks: Array<SubTasks>;
};

type SubTasks = {
  content: string;
  done: boolean;
};

const Todo = (props: Props) => {
  return (
    <Wrapper>
      <List>
        <Dot color={props.color}></Dot>
        <Title>{props.title}</Title>
      </List>
      {props.tasks.map((item, key) => (
        <List key={item.id}>
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
`;
const Color = styled.div`
  width: 8px;
  height: 8px;
`;
const Title = styled.h3`
  font: var(--medium14);
`;
const SubText = styled.p`
  font: var(--normal14);
  color: var(--sub);
`;
