import styled from "@emotion/styled";
import React from "react";

import Text from "@/components/shared/Text";
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
          <Div>
            <ImageWrapper>
              <EmptyListSvg
                className="fill-sub"
                width={80}
                height={80}
              ></EmptyListSvg>
            </ImageWrapper>
          </Div>
          <Div>
            <Text center color="var(--sub)">
              there is no list.
            </Text>
            <Text center color="var(--sub)">
              press + to add the list
            </Text>
          </Div>
        </Wrapper>
      );
    case "task":
      return (
        <Wrapper>
          <Div>
            <ImageWrapper>
              <EmptyPageSvg
                className="fill-sub"
                width={80}
                height={80}
              ></EmptyPageSvg>
            </ImageWrapper>
          </Div>
          <Div>
            <Text center color="var(--sub)">
              there is no task.
            </Text>
            <Text center color="var(--sub)">
              press + to add the task.
            </Text>
          </Div>
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
const Div = styled.div``;
