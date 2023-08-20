import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

import useModal from "@/hooks/useModal";
import CheckSvg from "@/images/check.svg";
import TrashCanSvg from "@/images/trash_can.svg";
import Dot from "@/shared/Dot";
import { Cluster, Task } from "@/types";

const Todo = ({ clusterId, color, title, tasks }: Cluster) => {
  const { openDeleteClusterModal } = useModal();

  return (
    <Link href={`/todo/${clusterId}`}>
      <Wrapper>
        <TitleBox>
          <FlexBox>
            <Dot color={color}></Dot>
            <Title>{title}</Title>
          </FlexBox>
          <DeleteIconWrapper
            onClick={(e) => {
              e.preventDefault();
              openDeleteClusterModal(clusterId);
            }}
          >
            <TrashCanSvg className="fill-sub"></TrashCanSvg>
          </DeleteIconWrapper>
        </TitleBox>
        {tasks.map((item: Task) => (
          <List key={item.taskId}>
            {item.completed ? (
              <FlexBox>
                <CheckSvg
                  className="fill-sub"
                  width={16}
                  height={16}
                ></CheckSvg>
                <SubText textDecoration="line-through">{item.content}</SubText>
              </FlexBox>
            ) : (
              <FlexBox>
                <Dot color="var(--box)"></Dot>
                <SubText>{item.content}</SubText>
              </FlexBox>
            )}
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
  width: calc(100vw - 32px);
  min-width: var(--minWidth);
  border-radius: 5px;
  box-shadow: var(--boxShadow);
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
  overflow: hidden;
  cursor: pointer;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  word-wrap: break-word;
  padding-left: 16px;
`;
const List = styled.div`
  width: 100%;
  word-wrap: break-word;
  padding: 0px 16px 12px 16px;
`;
const Title = styled.h3`
  font: var(--medium16);
  width: calc(100% - 24px);
  flex: 1;
`;
const SubText = styled.p<any>`
  font: var(--normal14);
  color: var(--sub);
  text-decoration: ${(props) => props.textDecoration};
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DeleteIconWrapper = styled.div`
  padding: 8px 16px;
`;
