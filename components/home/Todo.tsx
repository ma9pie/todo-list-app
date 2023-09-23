import styled from "@emotion/styled";
import Link from "next/link";
import React, { MouseEvent } from "react";

import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import useTrackEvent from "@/hooks/useTrackEvent";
import CheckSvg from "@/images/check.svg";
import TrashCanSvg from "@/images/trash_can.svg";
import Dot from "@/shared/Dot";
import { Cluster, Task } from "@/types";

const Todo = ({ clusterId, color, title, tasks }: Cluster) => {
  const { removeCluster } = useTodo();
  const { openRemoveClusterModal } = useModal();
  const { trackClickIcon } = useTrackEvent();

  const tasksNum = tasks.length;

  const filterdList = [...tasks]
    .sort((a) => (a.completed ? 1 : -1))
    .slice(0, 8);

  const handleRemoveList = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    trackClickIcon("TrashCan");
    openRemoveClusterModal(() => removeCluster(clusterId));
  };

  return (
    <Link href={`/todo/${clusterId}`}>
      <Wrapper>
        <TitleBox>
          <FlexBox width="calc(100% - 56px)">
            <Dot color={color}></Dot>
            <Title>{title}</Title>
          </FlexBox>
          <IconWrapper onClick={handleRemoveList}>
            <TrashCanSvg className="fill-sub"></TrashCanSvg>
          </IconWrapper>
        </TitleBox>
        {filterdList.map((item: Task) => (
          <List key={item.taskId}>
            {item.completed ? (
              <FlexBox>
                <div>
                  <CheckSvg
                    className="fill-sub"
                    width={16}
                    height={16}
                  ></CheckSvg>
                </div>
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
        {tasksNum > 8 && (
          <List>
            <SubText>{`+ ${tasksNum - 8} Tasks`}</SubText>
          </List>
        )}
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
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SubText = styled.p<{ textDecoration?: string }>`
  font-size: 14px;
  line-height: 18px;
  color: var(--sub);
  text-decoration: ${(props) => props.textDecoration};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const FlexBox = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: ${(props) => props.width || "100%"};
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 42px;
`;
