import styled from "@emotion/styled";
import React from "react";

import EmptyListSvg from "@/images/empty_list.svg";
import EmptyPageSvg from "@/images/empty_page.svg";

interface Props {
  type: "list" | "task";
}

const EmptyData = ({ type }: Props) => {
  switch (type) {
    case "list":
      return (
        <Wrapper>
          <ImageWrapper>
            <EmptyListSvg width={80} height={80}></EmptyListSvg>
          </ImageWrapper>
          <TextBox>
            <Text>there is no list.</Text>
            <Text>press + to add the list</Text>
          </TextBox>
        </Wrapper>
      );
    case "task":
      return (
        <Wrapper>
          <ImageWrapper>
            <EmptyPageSvg width={80} height={80}></EmptyPageSvg>
          </ImageWrapper>
          <TextBox>
            <Text>there is no task.</Text>
            <Text>press + to add the task.</Text>
          </TextBox>
        </Wrapper>
      );
    default:
      return null;
  }
};

export default EmptyData;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: calc(80vh - 120px);
`;
const ImageWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--box);
  & * {
    background-color: inherit;
  }
`;
const TextBox = styled.div``;
const Text = styled.p`
  text-align: center;
  font: var(--medium14);
`;
