import styled from "@emotion/styled";
import React from "react";

import Loading from "@/components/shared/Loading";

interface Props {
  isLoading?: boolean;
}

const PageLoading = ({ isLoading }: Props) => {
  if (!isLoading) return null;
  return (
    <Wrapper>
      <Loading></Loading>
    </Wrapper>
  );
};

export default PageLoading;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
`;
