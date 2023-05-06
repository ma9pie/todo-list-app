import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

import Dot from "@/shared/Dot";
import { Cluster, Task } from "@/types";

const Todo = (props: Cluster) => {
  return (
    <Link href={`/todo/${props.clusterId}`}>
      <Wrapper>
        <List>
          <Dot color={props.color}></Dot>
          <Title>{props.title}</Title>
        </List>
        {props.tasks.map((item: Task) => (
          <List key={item.taskId}>
            <Dot color="var(--box)"></Dot>
            <SubText>{item.content}</SubText>
          </List>
        ))}
      </Wrapper>
    </Link>
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
